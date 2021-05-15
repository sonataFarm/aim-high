# require_relative '../../app/services/seed_guest_demo'

namespace :seed do
  task :guest_demo => :environment do
    SeedGuestDemo.perform
  end
end
