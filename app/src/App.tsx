import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/muiTheme'

import { SetTime } from '@src/components/SetTime.tsx'
import { AddTeamDialog, Team } from '@src/components/AddTeamDialog.tsx'
import { EditTeamDialog } from '@src/components/EditTeamDialog.tsx'
import testSound from '../src/assets/sound.mp3'

const { ipcRenderer } = window.require('electron')

// TODO: AFTER APPLICATION IS LOADED WE HAVE TO GET THE SCENARIO DATA FROM THE SERVER
// IF THE SCENARIO DOES NOT HAVE STEPS WE HAVE TO GRAB THEM FROM SCRIPTS AND SAVE THEM TO THE SCENARIO
// APP SHOULD BE A WRAPPER AND WE HAVE TO CREATE TO SEPARATE COMPONENTS

const App: React.FC = () => {
    const [isClockStart, setIsClockStart] = useState(false)
    const [timer, setTimer] = useState('15:00')
    const Ref = useRef<any>()
    const [isOpenAddTeamDialog, setIsOpenAddTeamDialog] = React.useState(false)
    const [teams, setTeams] = useState<Team[]>([])
    const [edittedUserIndex, setEdittedUserIndex] = useState<number | null>(
        null
    )

    const onClickOpenClock = async () => {
        await ipcRenderer.sendSync('open-clock')
    }

    const onRemoveUser = async (color?: string) => {
        await ipcRenderer.sendSync('remove-team', color)
    }

    const onClickStartClock = async () => {
        await ipcRenderer.sendSync('start-clock', { teams })
    }

    const onClickStopClock = async () => {
        await ipcRenderer.sendSync('stop-clock')
    }

    const onClickRestart = async () => {
        setTeams([])
        setTimer('15:00')
        await ipcRenderer.sendSync('stop-clock')
        await ipcRenderer.sendSync('restart')
    }

    const onClickNewRound = async () => {
        setTimer('15:00')
        await ipcRenderer.sendSync('stop-clock')
        await ipcRenderer.sendSync('newRound')
    }

    const pretendentToKing = async () => {
        await ipcRenderer.sendSync('pretendentToKing')
        await ipcRenderer.sendSync('getTeamTimeOnKingSite')
    }

    const newPretendent = async () => {
        await ipcRenderer.sendSync('newPretendent')
    }

    const pointForKing = async () => {
        await ipcRenderer.sendSync('pointForKing')
        await ipcRenderer.sendSync('getTimeOnKingSite')
        newPretendent()
    }

    const stopTimer = () => {
        clearInterval(Ref.current)
    }

    React.useEffect(() => {
        ipcRenderer.on(
            'start-clock',
            (_event: Event, { start }: { start: boolean }) => {
                setIsClockStart(start)
            }
        )

        ipcRenderer.on(
            'set-teams',
            (_event: Event, { teams }: { teams: Team[] }) => {
                // const sortedTeams = teams.sort(
                //     (a, b) => (a.startPosition ?? 5) - (b.startPosition ?? 5)
                // )
                console.log(teams)
                setTeams(teams)
            }
        )

        ipcRenderer.on('stop-clock', (_event: Event) => {
            setIsClockStart(false)
            stopTimer()
        })

        ipcRenderer.on(
            'set-clock',
            (
                _event: Event,
                { minutes, seconds }: { minutes: string; seconds: string }
            ) => {
                setTimer(
                    `${parseInt(minutes) < 10 ? '0' : ''}${parseInt(minutes)}:${parseInt(seconds) < 10 ? '0' : ''}${parseInt(seconds)}`
                )
            }
        )

        return () => {
            ipcRenderer.removeAllListeners('isLoading')
        }
    }, [teams])

    useEffect(() => {
        if (timer === '00:02') {
            new Audio(testSound).play()
        }
    }, [timer])
    const handleAddTeam = async (team: Team) => {
        const newTeams = [...teams, team]
        setTeams(newTeams)
        await ipcRenderer.sendSync('setTeams', { teams: newTeams })
    }
    const editTeam = async (team: Team) => {
        const newTeams = [...teams]
        console.log(team)

        if (edittedUserIndex === null) return

        newTeams[edittedUserIndex] = team
        setTeams(newTeams)
        await ipcRenderer.sendSync('setTeams', { teams: newTeams })
    }
    const handleEditTeamClose = () => setEdittedUserIndex(null)
    const sortTeams = async () => {
        const sortedTeams = [...teams].sort(
            (a, b) => (a.startPosition ?? 5) - (b.startPosition ?? 5)
        )
        setTeams(sortedTeams)
        await ipcRenderer.sendSync('setTeams', { teams: sortedTeams })
    }

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
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) +
                    ':' +
                    (seconds > 9 ? seconds : '0' + seconds)
            )
        }
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
        if (isClockStart) {
            clearTimer(getDeadTime())
        }
    }, [isClockStart])

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <div>
                        <h4>Akcje</h4>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '10px',
                            }}
                        >
                            <button
                                onClick={async () => {
                                    await onClickOpenClock()
                                }}
                            >
                                Otwórz zegar
                            </button>
                            <button
                                onClick={async () => {
                                    await onClickStartClock()
                                }}
                                disabled={teams.length < 3}
                            >
                                START
                            </button>
                            <button
                                onClick={async () => {
                                    await onClickStopClock()
                                }}
                            >
                                STOP
                            </button>
                            <button
                                onClick={() => setIsOpenAddTeamDialog(true)}
                            >
                                Dodaj drużynę
                            </button>
                            <button onClick={pretendentToKing}>
                                Pretendent na króla
                            </button>
                            <button onClick={newPretendent}>
                                Nowy pretendent
                            </button>
                            <button
                                onClick={pointForKing}
                                style={{
                                    backgroundColor: '#f5cc00',
                                    border: '1px solid #f5cc00',
                                }}
                            >
                                Punkt dla króla
                            </button>
                        </div>
                    </div>
                    <SetTime />
                    <AddTeamDialog
                        isOpen={isOpenAddTeamDialog}
                        handleClose={setIsOpenAddTeamDialog}
                        handleAddTeam={handleAddTeam}
                    />
                    <div>
                        <h4>Drużyny</h4>
                        <button onClick={sortTeams}>Sortuj po pozycji</button>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: 'fit-content',
                                gap: '10px',
                            }}
                        >
                            {teams.map((team, index) => (
                                <div
                                    key={`${team.player1}-${team.player2}`}
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <b>{index + 1}.</b>{' '}
                                        <div
                                            style={{
                                                backgroundColor: team.teamColor,
                                                width: '10px',
                                                margin: '0 10px',
                                                height: '80%',
                                            }}
                                        ></div>
                                        {team.player1} - {team.player2}
                                    </p>
                                    <button
                                        onClick={() =>
                                            setEdittedUserIndex(index)
                                        }
                                    >
                                        Edytuj
                                    </button>
                                    {team.teamColor && teams.length > 3 && (
                                        <button
                                            onClick={() =>
                                                onRemoveUser(team.teamColor)
                                            }
                                        >
                                            Usuń
                                        </button>
                                    )}
                                    <p style={{ margin: 0 }}>
                                        punkty: {team.points || 0} spędzony
                                        czas:{' '}
                                        {team.spentTime
                                            ? Math.floor(team.spentTime / 60)
                                            : '00'}
                                        :
                                        {team.spentTime
                                            ? team.spentTime % 60 < 10
                                                ? `0${team.spentTime % 60}`
                                                : team.spentTime % 60
                                            : '00'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4>Zegar</h4>
                        <h1>{timer}</h1>
                    </div>
                    {edittedUserIndex !== null && (
                        <EditTeamDialog
                            isOpen
                            player1={teams[edittedUserIndex].player1}
                            player2={teams[edittedUserIndex].player2}
                            teamColor={teams[edittedUserIndex].teamColor}
                            startPosition={
                                teams[edittedUserIndex].startPosition
                            }
                            points={teams[edittedUserIndex].points}
                            handleClose={handleEditTeamClose}
                            handleEditTeam={editTeam}
                        />
                    )}
                </div>
                <div>
                    <button
                        style={{
                            backgroundColor: 'red',
                            marginBottom: '40px',
                            marginLeft: '40px',
                        }}
                        onClick={onClickRestart}
                    >
                        RESTART
                    </button>
                    <button
                        style={{
                            backgroundColor: 'orange',
                            marginBottom: '40px',
                            marginLeft: '40px',
                        }}
                        onClick={onClickNewRound}
                    >
                        NOWA RUNDA
                    </button>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App
