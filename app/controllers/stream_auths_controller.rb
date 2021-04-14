class StreamAuthsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    stream_key = params[:key]
    if stream_key == 'supersecret'
      head :ok
    else
      head :unprocessable_entity
    end
  end
end
