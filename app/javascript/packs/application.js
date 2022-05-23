
var fullDayRatio = 0; //ratio of container height ot time scale
var fullDayHeight = 0; //pixels
var techWorkOrders = {}; //Information about work orders

document.addEventListener('DOMContentLoaded', () => {

    setFullDayRatio();
    setBlockPositionAndHeight();
    
    window.addEventListener('resize', () => {
        setFullDayRatio();
        setBlockPositionAndHeight();
    });

    const modal = document.getElementById('modal');

    // Listen for click in between work orders and display available time.
    document.querySelectorAll('.tech-fullday').forEach(fullDay => {
        fullDay.addEventListener('click', event => {
            if(!event.target.classList.contains('tech-fullday')){
                return;
            }
            const techID = fullDay.dataset.techId;
            const clickPos = event.offsetY;

            const start = getRelevantYPos(techID, 'start', clickPos);
            const end = getRelevantYPos(techID, 'end', clickPos);

            const timeAvail = (start - end) / fullDayRatio / 60; 
            document.getElementById('modal-minutes').innerHTML = Math.round(timeAvail);

            modal.style.display = "block";
        });
    });

    // Close modal listeners
    document.getElementById('modal-close').addEventListener("click", () => {
        modal.style.display = "none";
    });
    window.addEventListener('click', event => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

}, false);

// Gets the height of a technicians "fullday" div.
// The value is used to calculate position/duration of a block relative to a full day.
function setFullDayRatio(){
    fullDayHeight = document.getElementById('1-fullday').clientHeight;
    fullDayRatio = fullDayHeight / fullDayDuration;
}

// Query for all the blocks and size/position them
// Also stores the technicians block start/end y positions for later calculations
function setBlockPositionAndHeight(){
    techWorkOrders = {};
    document.querySelectorAll('.wo-block').forEach(block => {
        const timeStart = block.dataset.timeStart - fullDayTimeStart;
        const duration = block.dataset.duration;
        const techID = block.dataset.techId;

        const height = duration * fullDayRatio;
        const top = timeStart * fullDayRatio;

        block.style.height =  height + "px";
        block.style.top = top + "px";

        if(!techWorkOrders.hasOwnProperty(techID)){
            techWorkOrders[techID] = {
                start: [fullDayHeight],
                end: [0]
            };
        }
        techWorkOrders[techID].start.push(top);
        techWorkOrders[techID].end.push(top + height);
    });
}

// Search through the technicians work order array and return the closest relevant y position
function getRelevantYPos(techID, startEnd, clickPos){
    return techWorkOrders[techID][startEnd].reduce((prev, curr) => {
        const prevDiff = clickPos - prev;
        const currDiff = clickPos - curr;

        if(startEnd === 'end'){
            if(currDiff < 0){
                return prev;
            } else if(currDiff < prevDiff){
                return curr;
            }
        } else { //start
            if(currDiff > 0){
                return prev;
            } else if(currDiff > prevDiff){
                return curr;
            }
        }
        return prev;
    });
}