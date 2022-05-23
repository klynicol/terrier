# Terrier, Rails Scheduling Assignment
#### Author, Mark Wickline
----

## Working Environment
Windows Subsystem for Linux  
Ubuntu 20.04  
Ruby 3.1.2  
Rails 7.0.3  
MySQL 8.0.29  

## Installation
#### Note this installation is for WSL (Windows Subsystem for Linux)
Install Ruby `https://gorails.com/setup/ubuntu/18.04`  
Install MySQL, run  
```
sudo apt-get update  
sudo apt-get install mysql-server mysql-client libmysqlclient-dev
```
Clone this repository, run  
```
git clone https://github.com/klynicol/terrier.git 
cd terrier
```
Create the terrier user on mysql, run  
```
sudo mysql -u root
CREATE USER 'terrier'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
GRANT ALL ON *.* TO `terrier`@`localhost`;
EXIT;
```
In my case I had the following error when running mysql 
```
Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (13)
```
To solve change the permissions of the mysqld folder, run  
```
sudo chmod -R 755 /var/run/mysqld
sudo service mysql restart
```
Install dependencies, run  
```
bundle install
npm install
```
Run the rails database rake, run  
```
rails db:setup
```
Import initial data, run  
```
rake initial_data:import
```
Serve the application, run  
```
rails server
```  
Navigate to `localhost:3000`


## Gem file for reference
```
source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.3"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use mysql as the database for Active Record
gem "mysql2", "~> 0.5"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end

gem "webpacker"
```
