/*
    * MIT License
    *
    * Copyright (c) 2024 Paul Willems <paul.willems@gmail.com>
    *
    * Permission is hereby granted, free of charge, to any person obtaining a copy
    * of this software and associated documentation files (the "Software"), to deal
    * in the Software without restriction, including without limitation the rights
    * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    * copies of the Software, and to permit persons to whom the Software is
    * furnished to do so, subject to the following conditions:
    *
    * The above copyright notice and this permission notice shall be included in all
    * copies or substantial portions of the Software.
    *
    * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    * SOFTWARE.
    */

const client = require('node-tado-client')

// Create a new Tado instance
var tado = new client.TadoX()

module.exports = function (app) {
    const plugin = {
        id: 'signalk-tado-integration',
        name: 'SignalK Tado X Integration',
        description: 'A plugin to pull data from Tado X smart heating appliances into SignalK'
    }
    
    let job

    plugin.start = function (options) {
        if(options.username && options.password) {
            job = setInterval(function () {
                tado.login(options.username, options.password).then(() => {
                    tado.getMe().then((response) => {
                        response.homes.forEach(home => {
                            tado.getRooms(home.id).then(response => {
                                response.forEach(room => {
                                    app.handleMessage(
                                        plugin.id,
                                        {
                                            updates: [{ 
                                                values: [
                                                    {
                                                        path: `environment.inside.${safeRoomName(room.name)}.temperature`,
                                                        value: toKelvin(room.sensorDataPoints.insideTemperature.value)
                                                    },
                                                    {
                                                        path: `environment.inside.${safeRoomName(room.name)}.humidity`,
                                                        value: room.sensorDataPoints.humidity.percentage / 100
                                                    },
                                                    {
                                                        path: `environment.inside.${safeRoomName(room.name)}.temperatureSetting`,
                                                        value: toKelvin(room.setting.temperature.value)
                                                    },
                                                    {
                                                        path: `environment.inside.${safeRoomName(room.name)}.heatingStatus`,
                                                        value: room.setting.power
                                                    }
                                                ] 
                                            }]
                                        },
                                        'v2'
                                    )
                                })
                            })
                        })
                    })
                }, () => {
                    app.debug('Login failure')
                })
            }, options.updateFrequency * 1000)
        }
    }
    
    plugin.stop = function () {
        if(job) {
            clearInterval(job)
        }
    }
    
    plugin.schema = {
        title: 'A registration form',
        description: 'This plugin queries Tado\'s servers to retreive information from your appliances and publish the data as SignalK paths',
        type: 'object',
        required: ['username', 'password', 'updateFrequency'],
        properties: {
            username: {
                type: 'string',
                title: 'Your Tado account username (email)'
            },
            password: {
                type: 'string',
                title: 'Your Tado account password'
            },
            updateFrequency: {
                type: 'number',
                title: 'How often to update data (seconds)',
                default: 60
            }
        }
    }

    function toKelvin(celcius) {
        return celcius + 273.15
    }

    function safeRoomName(roomName) {
        return roomName.replace(/[^A-Za-z0-9]/g, "")
    }

    return plugin
}
