const mongoose = require("mongoose");

const AboutMissionSchema = new mongoose.Schema(
    {
        mission: {
            type: String,
            required: true,
        },
        vision: {
            type: String,
            required: true,
        },
    },
    { timeStamps: true }
);

module.exports = mongoose.model("AboutMission", AboutMissionSchema);