$(function(){
    //make connection
    var socket_url = window.location.href + 'chat';
    console.log(socket_url)
    var socket = io.connect(socket_url)

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    //Emit message
    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
    feedback.html('');
    message.val('');
    chatroom.append(`<p class='message' style='background-color: ${data.user.color}'>` + data.user.username + ": " + data.message + "</p>")
})

    //Emit a username
    send_username.click(function(){
        socket.emit('change_username', {username : username.val()})
    })

    //Emit typing
    message.bind("keypress", (e) => {
        socket.emit('typing')
        if (e.which == 13) {
            socket.emit('new_message', {message : message.val()})
        }
})

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.user.username + " is typing a message..." + "</i></p>")
})
});
