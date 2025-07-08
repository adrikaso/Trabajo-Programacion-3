const repo = require('../persistence/repositories/SurveyRepository');

async function createSurvey(data) {
    return await repo.create(data);
}

async function getAllSurveys() {
    return await repo.getAll();
}

async function getSurveyById(id) {
    return await repo.getById(id);
}

async function deleteSurveyById(id) {
    return await repo.remove(id);
}

async function updateSurveyById(id, surveyUpdated) {
    return await repo.update(id, surveyUpdated);
}

module.exports = { createSurvey, getAllSurveys, getSurveyById, deleteSurveyById, updateSurveyById };