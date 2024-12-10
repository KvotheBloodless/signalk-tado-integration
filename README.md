<h3 align="center">SignalK Active Captain Resources</h3>

<div align="center">

[![Release](https://img.shields.io/github/v/release/KvotheBloodless/signalk-tado-integration)](https://github.com/KvotheBloodless/signalk-tado-integration/releases)
[![GitHub Issues](https://img.shields.io/github/issues/KvotheBloodless/signalk-tado-integration)](https://github.com/KvotheBloodless/signalk-tado-integration/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/KvotheBloodless/signalk-tado-integration)](https://github.com/KvotheBloodless/signalk-tado-integration/pulls)
[![License](https://img.shields.io/github/license/KvotheBloodless/signalk-tado-integration)](https://github.com/KvotheBloodless/signalk-tado-integration?tab=MIT-1-ov-file#readme)

</div>

---

<p align="center">A plugin for the node.js <a href="https://github.com/SignalK/signalk-server">Signal K server</a> for boats to import data from the <a href = "https://www.tado.com/">Tado X API</a> and make these available as SignalK paths.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

 * Signal K is an open source server application that runs as a central information hub on a boat. It centralises data, provides a rich API to consume the data, and is extensible through a comprehensive suite of plugins (such as this one) and web applications.

 * Tado markets a range of smart heating appliances.

This plugin's purpose is to bring together these 2 components by making information from the Tado API available as paths throught the Signal K server which can then be consumed.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you up and running.

### Prerequisites

 * A running instance of the Signal K node server with a position source (a GPS).

Instructions [here](https://github.com/SignalK/signalk-server/blob/master/README.md)

### Installing this plugin

Through the Signal K server Appstore, search for signalk-tado-integration, and click the Install button.

### Configuration

In the Signal K menu, head to Server -> Plugin Config, and find Tado X Integration then enable the plugin. Enter your Tado username and password.

## 🎈 Usage <a name="usage"></a>

The data will become available and you can nwo come up with a creative way to use it.

## ✍️ Authors <a name = "authors"></a>

- [@KvotheBloodless](https://github.com/KvotheBloodless) - Idea & Initial work

<a href="https://www.buymeacoffee.com/KvotheBloodless" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>


See also the list of [contributors](https://github.com/KvotheBloodless/signalk-tado-integration/graphs/contributors) who participated in this project.
