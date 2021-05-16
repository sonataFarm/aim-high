class AddMonitoringToGoals < ActiveRecord::Migration[6.1]
  def change
    add_column :goals, :monitoring, :text
  end
end