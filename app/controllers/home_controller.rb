class HomeController < ApplicationController
    def index
        @technicians = Technician.all
    end
end
