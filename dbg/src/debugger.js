//=========================================================
// CFxNES debugger
//=========================================================

import readline from 'readline';
import path from 'path';
import util from 'util';
import yargs from 'yargs';
import coreConfig from '../../core/src/config';
import LoggingCPU from '../../core/src/debug/LoggingCPU';
import BufferedOutputPPU from '../../core/src/debug/BufferedOutputPPU';
import Injector from '../../core/src/utils/Injector';
import { LogLevel, LogWriter } from '../../core/src/utils/logger';
import { copyProperties } from '../../core/src/utils/objects';
import { numberAsHex } from '../../core/src/utils/format';

//=========================================================
// Command line parser
//=========================================================

var argv = yargs
  .usage('Usage: $0 <file> [options]')
  .demand(1)
  .describe('v', 'Enables verbose output.')
  .alias('v', 'verbose')
  .boolean('v')
  .describe('s', 'Executes specified number of steps instead of running debugger in interactive mode.')
  .alias('s', 'step')
  .nargs('s', 1)
  .describe('j', 'Same as "step" but does not print output.')
  .alias('j', 'jump')
  .nargs('j', 1)
  .describe('b', 'Sets JS code that will break execution if evaluated to true.')
  .alias('b', 'break')
  .nargs('b', 1)
  .describe('i', 'Each output line will contain state in which the CPU was before executing the instruction.')
  .alias('i', 'prev-state')
  .boolean('i')
  .describe('p', 'Prints current video output to file after execution is done.')
  .alias('p', 'print')
  .help('h')
  .alias('h', 'help')
  .check(argv => {
    var steps = argv.steps;
    if ((steps != null) && (typeof steps !== 'number' || steps <= 0)) {
      return 'invalid number of steps';
    }
    return true;
  }).argv;

//=========================================================
// Initialization
//=========================================================

var config = copyProperties(coreConfig);
config.cpu = {class: LoggingCPU};
config.ppu = {class: BufferedOutputPPU};

var injector = new Injector(config);
var cartridgeFactory = injector.get('cartridgeFactory');
var cartridge = cartridgeFactory.fromLocalFile(argv._[0]);
var nes = injector.get('nes');
var cpu = injector.get('cpu');

var print = console.log;
var logger = argv.verbose ? cpu.verboseLogger : cpu.basicLogger;
logger.attach(LogWriter.toConsole());
cpu.stateAfterOperation = !argv.prevState;

logger.setLevel(LogLevel.INFO);
nes.insertCartridge(cartridge);
logger.setLevel(LogLevel.OFF);

//=========================================================
// Commands
//=========================================================

var breakCondition = null;

function helpCommand() {
  print('s, step  <number> ... Performs specified number of steps (default: 1).');
  print('j, jump  <number> ... Same as "step" but does not print output.');
  print('b, break <code>   ... Sets JS code that will break "step"/"jump" if evaluated to true (empty value to disable).');
  print('x, exec  <code>   ... Executes JS code (e.g.: "x nes.cpu.registerX = 0x10" or "x nes.ppu.scanline").');
  print('p, print <path>   ... Prints current video output to file (default: out.png).');
  print('r, reset          ... Resets CPU.');
  print('h, help           ... Prints this help.');
  print('q, quit           ... Quits the debugger.');
}

function jumpCommand(param) {
  var count = parseInt(param) || 1;
  for (var i = 0; i < count; i++) {
    if (breakCondition) {
      try {
        var result = eval(breakCondition);
        if (result) {
          print(`Break condition "${breakCondition}" evaluated to ${result}`);
          break;
        }
      } catch (error) {
        print(`Error when evaluating break condition "${breakCondition}": ${error.message}`);
        break;
      }
    }
    nes.step();
  }
}

function stepCommand(param) {
  logger.setLevel(LogLevel.INFO);
  jumpCommand(param);
  logger.setLevel(LogLevel.OFF);
}

function breakCommand(param) {
  breakCondition = param;
  if (breakCondition) {
    print(`Break condition set to "${breakCondition}"`);
  } else {
    print('Break condition cleared');
  }
}

function execCommand(param) {
  if (!param) {
    return;
  }
  try {
    var result = eval(param);
    if (typeof result === 'number') {
      result = `0x${numberAsHex(result)}`;
    } else if (typeof result === 'object') {
      result = util.inspect(result, {
        colorize: true,
        depth: 0,
      });
      result = result
        .replace('{', '{\n ')
        .replace('}', '\n}')
        .replace(/.*\[Function\].*\n/g, '');
    }
    print(`${param} = ${result}`);
  } catch (error) {
    print(`Error: ${error.message}`);
  }
}

function printCommand(param) {
  var name = typeof param === 'string' && param ? param : 'out'; // param can boolean when set from command line argument
  var file = path.extname(name).length ? name : name + '.png';
  return nes.ppu.writeFrameToFile(file).then(() => {
    print(`Screenshot written to "${path.resolve(file)}"`);
  });
}

function resetCommand() {
  nes.pressReset();
}

function quitCommand() {
  process.exit(0);
}

//=========================================================
// Immediate mode
//=========================================================

function runImmediate() {
  if (argv.break) {
    breakCommand(argv.break.trim());
  }
  if (argv.step) {
    stepCommand(argv.step);
  } else {
    jumpCommand(argv.jump);
  }
  if (argv.print) {
    printCommand(argv.print).then(quitCommand);
  } else {
    quitCommand();
  }
}

//=========================================================
// Interactive mode
//=========================================================

function runInteractive() {
  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt('command>');
  rl.prompt();

  rl.on('line', line => {
    var input = line.trim().split(/\s+/);
    var command = input[0];
    var param = input.slice(1).join(' ');
    var promise = Promise.resolve();

    switch (command) {
      case 'h':
      case 'help':
        helpCommand();
        break;
      case 's':
      case 'step':
        stepCommand(param);
        break;
      case 'j':
      case 'jump':
        jumpCommand(param);
        break;
      case 'b':
      case 'break':
        breakCommand(param);
        break;
      case 'x':
      case 'exec':
        execCommand(param);
        break;
      case 'p':
      case 'print':
        promise = printCommand(param);
        break;
      case 'r':
      case 'reset':
        resetCommand();
        break;
      case 'q':
      case 'quit':
        quitCommand();
        break;
      default:
        print('Type "help" to print available commands.');
    }

    promise.then(() => rl.prompt());
  });

  rl.on('close', () => quitCommand());
}

//=========================================================
// Start
//=========================================================

if (argv.step != null || argv.jump != null) {
  runImmediate();
} else {
  runInteractive();
}