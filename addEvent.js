const makeGoogleButton = () => {
    const googleLinkExists = document.getElementById("googleLink");
    if (window.location.pathname.match(/events\/[0-9]+/) && !googleLinkExists) {
        const eventTitle = encodeURI(document.getElementById("seo_h1_tag").innerHTML);

        const eventTimeContent = document.querySelector("#event_time_info div[content]").getAttribute("content");
        const hasFinishDate = eventTimeContent.includes("to");

        const getStartFinish = (time) => {
            const hasFinishDate = time.includes("to");
            if (hasFinishDate) {
                const startFinish = time.split(" to ");
                const start = new Date(startFinish[0]);
                const finish = new Date(startFinish[1]);
                const startISO = start.toISOString().replace(/-|:|\.\d\d\d/g, "");
                const finishISO = finish.toISOString().replace(/-|:|\.\d\d\d/g, "");
                return [startISO, finishISO]
            } else {
                const startFinishDate = new Date(time);
                const startISO = startFinishDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
                const finishISO = startFinishDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
                return [startISO, finishISO]
            }
        }

        const eventLocationDescription = document.querySelector("#event_summary [data-hovercard]") && document.querySelector("#event_summary [data-hovercard]").innerHTML || "Not Specified";
        const eventLocation = document.querySelector("#event_summary [data-hovercard] + div") && document.querySelector("#event_summary [data-hovercard] + div").innerHTML || document.querySelector("#event_time_info + li span") && document.querySelector("#event_time_info + li span").innerHTML;
        const eventDetails = window.location.href;

        const URLData = {
            title: eventTitle,
            dateTime: getStartFinish(eventTimeContent)[0] + "/" + getStartFinish(eventTimeContent)[1],
            details: encodeURI(eventDetails),
            location: encodeURI(eventLocation)
        }

        const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${URLData.title}&dates=${URLData.dateTime}&details=Name+of+location+is+${eventLocationDescription}+%0A+%0A+For+details,+see+facebook+event+here:+${URLData.details}&location=${URLData.location}&sf=true&output=xml`

        let googleLink = document.createElement('a');
        googleLink.setAttribute('id', "googleLink");
        googleLink.setAttribute('href', calendarLink);
        googleLink.setAttribute('target', '_blank');
        googleLink.innerHTML = "Add to Google Calendar";
        googleLink.style.color = "rgb(68,76,80)";
        googleLink.style.fontWeight = "bold";
        googleLink.style.marginLeft = "12px";
        googleLink.style.padding = "12px 24px";
        googleLink.style.border = "1px solid rgb(218,221,225)";
        googleLink.style.display = "inline-block";
        googleLink.style.marginBottom = "12px";
        googleLink.style.backgroundColor = "#f5f6f7";
        googleLink.style.textDecoration = "none";
        googleLink.style.borderRadius = "2px";
        googleLink.style.cursor = "pointer";

        document.getElementById("event_header_primary").appendChild(googleLink);
    }
}

setTimeout(() => {
    setInterval(makeGoogleButton, 2000)
}, 2000);