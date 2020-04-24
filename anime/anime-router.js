const express = require('express');

const Anime = require('./anime-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Anime.find()
        .then(anime => {
            res.status(200).json(anime);
        })
        .catch(error => {
            res.status(500).json({message: error.message});
        })
})

router.post('/', (req, res) => {
    const newAnime = req.body;

    Anime.add(newAnime)
        .then(anime => {
            res.status(201).json({message: 'anime successfully added'})
        })
        .catch(error => {
            res.status(500).json({errorMessage: error.message})
        });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Anime.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({message: 'anime deleted'})
        } else {
            res.status(404).json({message: 'could not find anime'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
    return res.status(200);
})

module.exports = router;