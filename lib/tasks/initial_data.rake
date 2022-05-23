require 'csv'
Rake::TaskManager.record_task_metadata = true

namespace :initial_data do

    desc "Import initial data from CSV files"
    task import: :environment do |task|
        p "Task description: #{task.full_comment}"

        initial_data_path = File.join Rails.root, 'initial_data/'

        open_parse_save_csv(initial_data_path + 'locations.csv', Location)
        open_parse_save_csv(initial_data_path + 'technicians.csv', Technician)
        open_parse_save_csv(initial_data_path + 'work_orders.csv', WorkOrder)

        p "Finished importing"
    end

    #Open CSV, parse it and save it to the databsase.
    def open_parse_save_csv(path, model)
        #bom|utf-8 encoding removes the byte order mark
        CSV.open(path, encoding: 'bom|utf-8', headers: true) do |csv|
            p "Importing from #{path}"
        
            csv.each do |row|
                if !model.exists?(id: row['id'])
                    p "Adding #{row}"

                    #re-arange date to fit database format
                    row['time'] = DateTime.strptime(row['time'], "%m/%d/%y %H:%M").to_fs(:db) if(row['time'])

                    model.create(row) #does preserve id from csv
                end
            end
        end
    end
end