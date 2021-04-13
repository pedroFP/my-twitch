import consumer from "./consumer"

$(document).on('turbolinks:load ajax:sucess', function() {
  const room = $('#chatroom').attr('room')
  const channel = consumer.subscriptions.create({channel: "ChatroomChannel", room: room}, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('CONECTED')
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
      console.log('DISCONECTED')
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      var user = data['user']
      var message = data['message']
      var chat = '<p><strong>' + user + ':</strong> ' + message + '</p>'
      $('#chatroom').append(chat)
      console.log($('#auto-scroll').is(':checked'))
      if ($('#auto-scroll').is(':checked')) {
        document.getElementById('chatroom').scrollTop =  document.getElementById('chatroom').scrollHeight
      }
    },

    speak: function(data) {
      return this.perform('speak', data);
    }
  });

  channel.speak({room: room})

  $('button#send').on('click', function(e){
    e.preventDefault();
    var message = $('textarea#message').val()
    var user = $('textarea#message').attr('user-name')
    if (message != '') {
      channel.speak({message: message, user: user, room: room})
    }
    $('textarea#message').val('')
  })

  $(document).on('keypress', 'textarea#message', function(event){
    if(event.keyCode == 13) {
      event.preventDefault()
      var message = $('textarea#message').val()
      var user = $('textarea#message').attr('user-name')
      if (message != '') {
        channel.speak({message: message, user: user, room: room})
      }
      event.target.value = ''
    }
  })

  $('#auto-scroll').on('click', function(e){
    if ($('#auto-scroll').is(':checked')) {
      document.getElementById('chatroom').scrollTop = document.getElementById('chatroom').scrollHeight
    }
  })
})

