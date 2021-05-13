class CreateObstacles < ActiveRecord::Migration[6.1]
  def change
    create_table :obstacles do |t|
      t.text :description
      t.text :solution

      t.references :goal, foreign_key: true, index: true, null: false

      t.timestamps
    end
  end
end
