import React from 'react'
import { StatisticLine } from './StatisticLine'

export const Statistics = ({stats}) => {

const all = stats.good + stats.neutral + stats.bad
const average = (stats.good-stats.bad)/all
const positive = (stats.good/all) * 100

  return (
    <div>
        <h1>statistics</h1>
        {
            !all 
            ? <p>No feedback given</p>
            :<div>
                <StatisticLine text='good' value={stats.good}/>
                <StatisticLine text='neutral' value={stats.neutral}/>
                <StatisticLine text='bad' value={stats.bad}/>
                <StatisticLine text='all' value={all}/>
                <StatisticLine text='average' value={average ? average : 0}/>
                <StatisticLine text='positive' value={positive ? `${positive} %` : `0 %`}/>
            </div>
        }
      
      
    </div>
  )
}
