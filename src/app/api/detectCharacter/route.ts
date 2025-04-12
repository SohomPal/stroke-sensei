import * as tf from '@tensorflow/tfjs';
import { NextResponse } from 'next/server';

// Use a global variable to store the model outside of the handler
let model: tf.LayersModel | null = null;
const chars = ['体', '日'];

const loadModel = async () => {
  if (model) {
    console.log("Model already loaded, using the cached model.");
    return model;
  }

  // Clear the backend to avoid variable name conflicts
  tf.engine().disposeVariables();
  tf.tidy(() => {
    // Run in tidy to clean up memory
  });

  const modelPath = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/model/model.json`;

  try {
    console.log("Loading model...");
    model = await tf.loadLayersModel(modelPath);
    console.log("Model loaded.");
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
    throw new Error("Failed to load model");
  }
};

export async function POST(req: Request) {
  try {
    const modelInstance = await loadModel();
    const data = await req.json();
    
    // Check if the input property exists in the data
    if (!data.input) {
      return NextResponse.json({ error: "Missing input data" }, { status: 400 });
    }
    
    // Convert 2D array to the format expected by TensorFlow.js
    // Need to reshape to match the model's input shape - for MNIST-like models, usually [1, 28, 28, 1]
    const inputArray = data.input;
    
    // Use tf.tidy to automatically clean up tensors
    const result = tf.tidy(() => {
      // Create a tensor from the 2D array with appropriate shape for the model
      // [1, height, width, 1] for a typical CNN model
      const inputTensor = tf.tensor4d(
        inputArray.flat(), 
        [1, inputArray.length, inputArray[0].length, 1]
      );
      
      // Get prediction
      const prediction = modelInstance.predict(inputTensor) as tf.Tensor;
      console.log("Prediction: ", prediction);
      
      // Convert prediction to JavaScript array
      return prediction.arraySync();
    });
    
    // Find the index with the highest probability (for classification tasks)
    let predictedClass;
    if (Array.isArray(result) && result.length > 0 && Array.isArray(result[0])) {
      const probabilities = result[0];
      console.log("Probabilities: ", probabilities);
      // Find the index of the maximum value in the probabilities array
      predictedClass = chars[(probabilities as number[]).indexOf(Math.max(...(probabilities as number[])))];
    }
    
    return NextResponse.json({ 
      result,
      prediction: predictedClass !== undefined ? [predictedClass] : [] 
    });
  } catch (error) {
    console.error("Error during prediction:", error);
    return NextResponse.json({ error: "Error processing the request" }, { status: 500 });
  }
}