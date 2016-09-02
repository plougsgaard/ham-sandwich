//   ██░ ██  ▄▄▄       ▄████▄   ██ ▄█▀
//  ▓██░ ██▒▒████▄    ▒██▀ ▀█   ██▄█▒
//  ▒██▀▀██░▒██  ▀█▄  ▒▓█    ▄ ▓███▄░
//  ░▓█ ░██ ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▓██ █▄
//  ░▓█▒░██▓ ▓█   ▓██▒▒ ▓███▀ ░▒██▒ █▄
//   ▒ ░░▒░▒ ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▒ ▓▒
//   ▒ ░▒░ ░  ▒   ▒▒ ░  ░  ▒   ░ ░▒ ▒░
//   ░  ░░ ░  ░   ▒   ░        ░ ░░ ░
//   ░  ░  ░      ░  ░░ ░      ░  ░
//                    ░

// needs to run as the first thing
require('babel-core/register')
require('babel-polyfill')

// now the server can be bootstrapped
require('./server')(require('./config').PORT)

//  ███████╗ ██████╗ ██████╗ ██████╗ ██╗   ██╗        ██╗
//  ██╔════╝██╔═══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╗██╔╝
//  ███████╗██║   ██║██████╔╝██████╔╝ ╚████╔╝     ╚═╝██║
//  ╚════██║██║   ██║██╔══██╗██╔══██╗  ╚██╔╝      ██╗██║
//  ███████║╚██████╔╝██║  ██║██║  ██║   ██║       ╚═╝╚██╗
//  ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝           ╚═╝
