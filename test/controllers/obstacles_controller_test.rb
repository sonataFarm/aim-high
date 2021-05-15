require "test_helper"

class ObstaclesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get obstacles_create_url
    assert_response :success
  end

  test "should get update" do
    get obstacles_update_url
    assert_response :success
  end

  test "should get destroy" do
    get obstacles_destroy_url
    assert_response :success
  end
end
