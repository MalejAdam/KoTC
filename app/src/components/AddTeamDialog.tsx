import { Dialog, Input } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
type Inputs = {
    player1: string
    player2: string
    teamColor?: string
    startPosition?: number
}

type Props = {
    isOpen: boolean
    handleClose: (value: boolean) => void
}

export const AddTeamDialog = ({ isOpen, handleClose }: Props) => {
    const { register, handleSubmit } = useForm<Inputs>()

    const onSubmit = ({ player1, player2, teamColor }: Inputs) => {
        if (!player1 || !player2) return

        handleClose(false)
    }

    return (
        <Dialog open={isOpen}>
            <form style={{ padding: '30px' }} onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '20px' }}>
                    <h1>Dodaj drużynę</h1>
                    <p>Zawodnik 1:</p>
                    <Input style={{ width: '100%' }} {...register('player1')} />
                    <p>Zawodnik 2:</p>
                    <Input style={{ width: '100%' }} {...register('player2')} />
                    <p>Kolor:</p>
                    <Input
                        style={{ width: '100%' }}
                        {...register('teamColor')}
                    />
                    <p>Pozycja startowa:</p>
                    <Input
                        type="number"
                        style={{ width: '100%' }}
                        {...register('startPosition')}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <button onClick={() => handleClose(false)}>Anuluj</button>
                    <button type="submit">Dodaj</button>
                </div>
            </form>
        </Dialog>
    )
}
