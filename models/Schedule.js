export class Schedule {
    interval = null;
    callback = null;

    constructor(interval,callback){
        this.interval = interval;
        this.callback = callback
    }
}

export class Schedulable {
    scheduleList = []
    update(ts){
    }

    addToSchedule(schedule){
        this.scheduleList.push(schedule)
    }
}

