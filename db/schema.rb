# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140506214044) do

  create_table "events", force: true do |t|
    t.string   "name"
    t.string   "date"
    t.string   "time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events_pets", id: false, force: true do |t|
    t.integer "event_id"
    t.integer "pet_id"
  end

  create_table "pets", force: true do |t|
    t.string   "name"
    t.string   "pet_type"
    t.text     "description"
    t.integer  "owner_id"
    t.integer  "sitter_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "plodos", force: true do |t|
    t.string   "type"
    t.string   "time"
    t.string   "info"
    t.integer  "pet_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "updates", force: true do |t|
    t.string   "date"
    t.string   "time"
    t.string   "info"
    t.integer  "pet_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.string   "remember_token"
    t.string   "location"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["remember_token"], name: "index_users_on_remember_token"

end
