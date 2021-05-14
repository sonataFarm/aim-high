class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.text :body
      t.references :goal, foreign_key: true, index: true, null: false
      t.timestamps
    end
  end
end
