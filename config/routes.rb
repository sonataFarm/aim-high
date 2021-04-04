Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api do
    resources :users, only: [ :create ]
    resource :session, only: [ :create, :destroy ]
    resources :visions, only: [ :create, :show, :update, :destroy ]
  end
  get '*path', to: 'static_pages#root'
end