Rails.application.routes.draw do
  get 'static_pages/root'
  get 'static_pages/test'
  root 'static_pages#root'
  namespace :api do
    resources :users, only: [ :create ]
    resource :session, only: [ :create, :destroy ]
  end
end
