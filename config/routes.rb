Rails.application.routes.draw do
  if Rails.env.development? 
    # Sidekiq dashboard
    require 'sidekiq/web'
    mount Sidekiq::Web => '/sidekiq'
  end
  get 'home/index'
  root 'home#index'
  # post 'stream_auth', to: 'stream_auth#create'
  resource :stream_auth, only: [:create]
  devise_for :users, controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
