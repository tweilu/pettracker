require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Pettracker
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
    config.i18n.enforce_available_locales = false

    config.middleware.insert_before ActionDispatch::Static, Rack::Cors do
        allow do
            origins ''
            resource '',
            headers: :any,
            methods: [:get, :options]
        end
    end

    config.assets.paths << Rails.root.join("app", "assets")
    config.assets.precompile += %w( .svg .eot .woff .ttf )
    config.assets.header_rules = {
        :global => {'Cache-Control' => 'public, max-age=31536000'},
        :fonts  => {'Access-Control-Allow-Origin' => '*'}
    }




  end
end
