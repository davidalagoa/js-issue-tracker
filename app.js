document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issuePriority = document.getElementById('issuePriorityInput').value;
    let issueAssign = document.getElementById('issueAssignInput').value;
    let issueID = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueID,
        description: issueDesc,
        priority: issuePriority,
        assign: issueAssign,
        status: issueStatus
    };

    if (localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
}

function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList')

    issuesList.innerHTML = "";

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let priority = issues[i].priority;
        let assign = issues[i].assign;
        let status = issues[i].status;

        issuesList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span>' + priority + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span>' + assign + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a>' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}