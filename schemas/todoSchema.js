const express = require('express');
const { default: mongoose } = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// instance method
todoSchema.methods = {
    findActive: function() {
        return mongoose.model("Todo").find({ status: "active"});
    },
    findActiveCallback: function(cb) {
        return mongoose.model("Todo").find({ status: "active"}, cb);
    }
};

// static method
todoSchema.statics = {
    findByJs: function() {
        return this.find({ title: /js/i});
    }
};

// query helpers
todoSchema.query = {
    byLanguage: function(language) {
        return this.find({ title: new RegExp(language, 'i')});
    }
};

module.exports = todoSchema;