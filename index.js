import React from "react"
import ReactDOM from "react-dom"
import "./style.css"

let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let weekArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class Calendar extends React.Component {
    constructor() {
        super()
        this.state = {
            date: new Date(),
            clock: "--:--:--",
            fullDate: ".....",
            monthYear: "...",
            list: [],
            intial: false,
            monthArr: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekArr: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        }
        this.renderMonth = this.renderMonth.bind(this)
        this.clock = this.clock.bind(this)
        this.fullDate = this.fullDate.bind(this)
    }

    clock() {
        let hours = this.state.date.getHours()
        let mins = this.state.date.getMinutes()
        let secs = this.state.date.getSeconds()

        setInterval(() => {
            secs++
            if(secs % 60 == 0) {
                mins++
                if(mins % 60 == 0) {
                    hours++
                    if(hours % 24 == 0) {
                        let newDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate() + 1)
                        this.setState({date: newDate})
                        this.fullDate()
                    }
                }
            }
            let displayedTime = "0".repeat(hours % 24 < 10) + hours % 24 + ":" + "0".repeat(mins % 60 < 10) + mins % 60 + ":" + "0".repeat(secs % 60 < 10) + secs % 60
            this.setState({clock: displayedTime})
        }, 1000)
    }

    fullDate() {
        let weekDayName = this.state.date.getDay()
        weekDayName = weekDayName == 0 ? 6 : weekDayName - 1
        let currDayNum = this.state.date.getDate()
        let displayedFullDate = this.state.weekArr[weekDayName].slice(0, 3) + " " + currDayNum + " " + this.state.monthArr[this.state.date.getMonth()] + " " + this.state.date.getFullYear()
        this.setState({fullDate: displayedFullDate})
    }

    renderMonth(num) {
        let currDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth() + num, 1)
        let newList = []

        this.state.weekArr.map((val, ind) => {
            newList.push(
                <h3 key={"weekdays" + ind}>
                    {val.slice(0, 2)}
                </h3>
            )
        })

        let weekDayNum = new Date(currDate.getFullYear() , currDate.getMonth(), 1).getDay()
        weekDayNum = weekDayNum == 0 ? 6 : weekDayNum - 1
        let prevMonthDay = new Date(currDate.getFullYear() , currDate.getMonth(), 0).getDate()
        for(let i = 1; i <= weekDayNum; i++) {
            newList.push((
                <div 
                  key={"prevCalCont" + i}
                  className="beyond-month"
                >
                    {(prevMonthDay - weekDayNum + i).toString()}
                </div>
            ))
        }

        let numDaysInMonth = new Date(currDate.getFullYear() , currDate.getMonth() + 1, 0).getDate()
        let isCurrDay = new Date().getMonth() == currDate.getMonth() && new Date().getFullYear() == currDate.getFullYear()
        for(let i = 1; i <= numDaysInMonth; i++) {
            newList.push((
                <div 
                  key={"primeCalCont" + i}
                  className={isCurrDay && new Date().getDate() == i ? "curr-day" : "none"}
                >
                    {(i).toString()}
                </div>
            ))
        }

        let nextMonthDay = 42 - numDaysInMonth - weekDayNum
        for(let i = 1; i <= nextMonthDay; i++) {
            newList.push((
                <div 
                  key={"nextCalCont" + i}
                  className="beyond-month"
                >
                    {(i).toString()}
                </div>
            ))
        }

        let newMonthYear = this.state.monthArr[currDate.getMonth()] + " " + currDate.getFullYear()

        this.setState({
            date: currDate,
            list: newList,
            monthYear: newMonthYear
        })

    }

    componentWillMount() {
        if(!this.state.intial) {
            this.clock()
            this.fullDate()
            this.renderMonth(0)
            this.setState({intial: true})
        }
    }

    render() {
        return(
            <div>
                <div id="clock">{this.state.clock}</div>
                <div>
                    <h1 id="full-date">{this.state.fullDate}</h1>
                </div>
                <div className="heading">
                    <h2 id="month-year">{this.state.monthYear}</h2>
                    <div className="buttons">
                        <button id="prev" onClick={() => this.renderMonth(-1)}>prev</button>
                        <button id="next" onClick={() => this.renderMonth(1)}>next</button>
                    </div>
                </div>
                <div id="cal-cont">
                    {this.state.list}
                </div>
                <br/>
                <br/>
                <br/>
                <p>The calendar is responsive, it worked with my 1080p monitor when I resized the window not sure about other cases.</p>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}


ReactDOM.render(<Calendar />, document.getElementById("calendar"))