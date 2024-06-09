import React, { useRef, useState } from 'react'
import { ThemeProvider } from '@mui/material'

import { theme } from '@src/theme/muiTheme.ts'
import { Team } from '@src/components/AddTeamDialog.tsx'
import Queen from '@src/assets/queen.png'
import King from '@src/assets/king.png'
import Crown from '@src/assets/crown.png'
import AlumetaltechLogo from '@src/assets/alumetaltech.png'

const { ipcRenderer } = window.require('electron')
const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
const Clock: React.FC = () => {
    const [isClockStart, setIsClockStart] = useState(false)

    const test = useRef(0)

    const [teams, setTeams] = useState<Team[]>([
        {
            player1: 'playerT11',
            player2: 'playerT12',
            teamColor: '#ff0000',
            startPosition: 1,
            spentTime: 0,
        },
        {
            player1: 'playerT12',
            player2: 'playerT22',
            teamColor: '#00ff00',
            startPosition: 2,
            spentTime: 0,
        },
        {
            player1: 'playerT13',
            player2: 'playerT23',
            teamColor: '#0000ff',
            startPosition: 3,
            spentTime: 0,
        },
        {
            player1: 'playerT14',
            player2: 'playerT24',
            teamColor: '#8000ff',
            startPosition: 4,
            spentTime: 0,
        },
        {
            player1: 'playerT15',
            player2: 'playerT25',
            teamColor: '#ffff00',
            startPosition: 5,
            spentTime: 0,
        },
    ])

    const Ref = useRef<any>()
    const [timer, setTimer] = useState('00:00')

    const getTimeRemaining = (e: string) => {
        const total = Date.parse(e) - Date.parse(new Date().toString())
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        return {
            total,
            minutes,
            seconds,
        }
    }

    const startTimer = (e: string) => {
        let { total, minutes, seconds } = getTimeRemaining(e)
        if (total >= 0) {
            test.current = test.current + 1
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const stopTimer = () => {
        clearInterval(Ref.current)
    }

    const clearTimer = (e: string) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        if (timer === '00:00') {
            setTimer('15:00')
        }

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current)

        Ref.current = setInterval(() => {
            startTimer(e)
        }, 1000)
    }

    const getDeadTime = () => {
        let deadline = new Date()

        const timerDivided = timer.split(':')
        const minutes = parseInt(timerDivided[0])
        const seconds = parseInt(timerDivided[1])

        if (minutes === 0 && seconds === 0) {
            // This is where you need to adjust if
            // you entend to add more time
            deadline.setSeconds(deadline.getSeconds() + 900)
            return deadline.toString()
        }

        deadline.setMinutes(deadline.getMinutes() + minutes)
        deadline.setSeconds(deadline.getSeconds() + seconds)
        return deadline.toString()
    }

    React.useEffect(() => {
        ipcRenderer.on(
            'start-clock',
            (
                _event: Event,
                { start, teams }: { start: boolean; teams: Team[] }
            ) => {
                console.log('start-clock')
                setIsClockStart(start)
                setTeams(teams)
            }
        )

        ipcRenderer.on('stop-clock', (_event: Event) => {
            setIsClockStart(false)
            stopTimer()
        })

        ipcRenderer.on(
            'getTeamTimeOnKingSite',
            async (_event: Event, { color }: { color: string }) => {
                console.log('kingTime', test.current)
                await ipcRenderer.sendSync('setTeamTimeOnKingSite', {
                    color,
                    spentTime: test.current,
                })
                test.current = 0
            }
        )

        ipcRenderer.on(
            'set-teams',
            (_event: Event, { teams }: { teams: Team[] }) => {
                setTeams(teams)
            }
        )

        ipcRenderer.on(
            'set-clock',
            (
                _event: Event,
                { minutes, seconds }: { minutes: number; seconds: number }
            ) => {
                setTimer(
                    `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                )
            }
        )

        return () => {
            ipcRenderer.removeAllListeners('isLoading')
        }
    }, [])

    React.useEffect(() => {
        if (isClockStart) {
            clearTimer(getDeadTime())
        }
    }, [isClockStart])

    return (
        <ThemeProvider theme={theme}>
            <div
                id="clock"
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    backgroundColor: '#000',
                }}
            >
                <div
                    style={{
                        height: '50%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={Queen}
                        alt="Queen"
                        height={220}
                        style={{ transform: 'rotate(-30deg)' }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={AlumetaltechLogo}
                            alt="Alumetaltech"
                            height={200}
                        />
                        <h1
                            style={{
                                ...centerStyle,
                                fontSize: '40px',
                                color: '#fff',
                            }}
                        >
                            {timer}
                        </h1>
                        <h1
                            style={{
                                ...centerStyle,
                                fontSize: '20px',
                                color: '#fff',
                                marginTop: '20px',
                            }}
                        >
                            COUNTDOWN
                        </h1>
                    </div>
                    <img
                        src={King}
                        alt="King"
                        height={220}
                        style={{ transform: 'rotate(30deg)' }}
                    />
                </div>
                <div
                    style={{
                        height: '50%',
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gridTemplateAreas: `
                            'nextUpTitle challengerTitle kingsideTitle'
                            'team1 pretendentTitle kingsideTeamTitle'
                            'team2 pretendent king'
                            'team3 pretendent king'
                        `,
                    }}
                >
                    <h1
                        style={{
                            gridArea: 'nextUpTitle',
                            ...centerStyle,
                            border: '1px solid white',
                            fontSize: '30px',
                            borderTop: '2px solid white',
                            color: '#fff',
                        }}
                    >
                        NEXT UP
                    </h1>
                    <h1
                        style={{
                            gridArea: 'challengerTitle',
                            ...centerStyle,
                            border: '1px solid white',
                            fontSize: '30px',
                            borderTop: '2px solid white',
                            color: '#fff',
                        }}
                    >
                        CHALLENGER
                    </h1>
                    <h1
                        style={{
                            gridArea: 'kingsideTitle',
                            ...centerStyle,
                            border: '1px solid white',
                            fontSize: '30px',
                            color: '#f5cc00',
                            borderTop: '2px solid white',
                        }}
                    >
                        KINGSIDE
                        <img src={Crown} style={{ marginLeft: '20px' }} />
                    </h1>
                    <div
                        style={{
                            gridArea: 'team1',
                            border: '1px solid white',
                            display: 'flex',
                        }}
                    >
                        <div style={{ width: '20%', ...centerStyle }}>
                            <h1 style={{ fontSize: '40px', color: '#fff' }}>
                                {teams[2].points ?? 0}
                            </h1>
                        </div>
                        <div
                            style={{
                                backgroundColor: teams[2].teamColor,
                                width: '15%',
                            }}
                        ></div>
                        <div style={{ width: '65%', ...centerStyle }}>
                            <h1
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    color: '#fff',
                                }}
                            >
                                {teams[2].player1} & {teams[2].player2}
                            </h1>
                        </div>
                    </div>
                    <div
                        style={{
                            gridArea: 'team2',
                            border: '1px solid white',
                            display: 'flex',
                        }}
                    >
                        <div style={{ width: '20%', ...centerStyle }}>
                            <h1 style={{ fontSize: '40px', color: '#fff' }}>
                                {teams[3].points ?? 0}
                            </h1>
                        </div>
                        <div
                            style={{
                                backgroundColor: teams[3].teamColor,
                                width: '15%',
                            }}
                        ></div>
                        <div style={{ width: '65%', ...centerStyle }}>
                            <h1
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    color: '#fff',
                                }}
                            >
                                {teams[3].player1} & {teams[3].player2}
                            </h1>
                        </div>
                    </div>
                    {teams[4] && (
                        <div
                            style={{
                                gridArea: 'team3',
                                border: '1px solid white',
                                display: 'flex',
                                color: '#fff',
                            }}
                        >
                            <div style={{ width: '20%', ...centerStyle }}>
                                <h1 style={{ fontSize: '40px' }}>
                                    {teams[4].points ?? 0}
                                </h1>
                            </div>
                            <div
                                style={{
                                    backgroundColor: teams[4].teamColor,
                                    width: '15%',
                                }}
                            ></div>
                            <div style={{ width: '65%', ...centerStyle }}>
                                <h1
                                    style={{
                                        fontSize: '20px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {teams[4].player1} & {teams[4].player2}
                                </h1>
                            </div>
                        </div>
                    )}
                    <div
                        style={{
                            gridArea: 'pretendentTitle',
                            ...centerStyle,
                            border: '1px solid white',
                            color: '#fff',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '20px',
                                textAlign: 'center',
                            }}
                        >
                            {teams[1].player1} & {teams[1].player2}
                        </h1>
                    </div>
                    <div
                        style={{
                            gridArea: 'kingsideTeamTitle',
                            ...centerStyle,
                            border: '1px solid white',
                            color: '#fff',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '20px',
                                textAlign: 'center',
                            }}
                        >
                            {teams[0].player1} & {teams[0].player2}
                        </h1>
                    </div>
                    <div
                        style={{
                            gridArea: 'pretendent',
                            ...centerStyle,
                            border: '1px solid white',
                            color: '#fff',
                        }}
                    >
                        <div
                            style={{
                                width: '40%',
                                height: '100%',
                                backgroundColor: teams[1].teamColor,
                            }}
                        />
                        <div
                            style={{
                                width: '60%',
                                ...centerStyle,
                            }}
                        >
                            <h1 style={{ fontSize: '100px' }}>
                                {teams[1].points ?? 0}
                            </h1>
                        </div>
                    </div>
                    <div
                        style={{
                            gridArea: 'king',
                            ...centerStyle,
                            border: '1px solid white',
                            color: '#fff',
                        }}
                    >
                        <div
                            style={{
                                width: '40%',
                                backgroundColor: teams[0].teamColor,
                                height: '100%',
                            }}
                        />
                        <div style={{ width: '60%', ...centerStyle }}>
                            <h1 style={{ fontSize: '100px' }}>
                                {teams[0].points ?? 0}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Clock
