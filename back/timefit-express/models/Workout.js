import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema(
  {
    workoutName: {
      type: String,
    },
    grups: {
      type: [
        {
          timeGroup: {
            numSets: {
              type: Number,
              required: true,
              default: 1,
            },
            exercises: {
              type: [
                {
                  exerciseName: {
                    type: String,
                    required: true
                  },
                  time: {
                    type: Number,
                    required: true,
                    default: 0,
                  }
                }
              ],
              required: true
            }
          }
        }
      ],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Workout = mongoose.model('Workout', WorkoutSchema);

export default Workout;
