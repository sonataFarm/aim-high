Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api do
    resources :users,   only: [ :create ]
    resource :session,  only: [ :create, :destroy ]
    resources :visions, only: [ :index, :create, :show, :update, :destroy ]
    resources :goals,   only: [ :index, :create, :show, :update, :destroy ]
    resources :reviews, only: [ :create, :update, :destroy ]
  end
  get '*path', to: 'static_pages#root'
end