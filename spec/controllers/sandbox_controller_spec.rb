require 'rails_helper'

RSpec.describe SandboxController, type: :controller do

  describe "GET #fetch" do
    it "returns http success" do
      get :fetch
      expect(response).to have_http_status(:success)
    end
  end

end
