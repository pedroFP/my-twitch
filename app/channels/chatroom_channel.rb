class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "my_twitch"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast data['room'], { message: data['message'], user: data['user'] }
  end
end

