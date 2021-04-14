class StreamAuthController < ApplicationController

  def create
    stream_key = params[:keay]
    respond_to do |format|
      if stream_key == 'supersecrete'
        format.html render: :nothing, status: :ok
      else
        format.html render: :nothing, status: :unprocessable_entity
      end
    end
  end
end
