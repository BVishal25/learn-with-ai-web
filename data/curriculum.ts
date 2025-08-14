import { Topic } from '../types';
import { BrainCircuitIcon, LayersIcon, BotIcon, EyeIcon, RocketIcon, GameControllerIcon, LayoutDashboardIcon } from '../components/ui/icons';

const AI_OVERVIEW_TOPIC: Topic = {
  id: 'ai-overview',
  title: 'AI Overview',
  description: 'Grasp the big picture of Artificial Intelligence, its main branches, and its impact on the world.',
  icon: LayoutDashboardIcon,
  lessons: [
    {
      id: 'ai-f1',
      title: 'What is Artificial Intelligence?',
      level: 'Foundations',
      description: 'Start with the fundamental question: what is AI and what does it mean to be "intelligent"?',
      subLessons: [
        {
          id: 'ai-f1-1', title: 'Defining Intelligence',
          microLessons: [
            { id: 'ai-f1-1-1', title: 'Turing Test and its Implications' },
            { id: 'ai-f1-1-2', title: 'The Chinese Room Argument' },
            { id: 'ai-f1-1-3', title: 'Weak AI vs. Strong AI' },
            { id: 'ai-f1-1-4', title: 'Symbolic AI vs. Connectionist AI' },
          ]
        },
        {
          id: 'ai-f1-2', title: 'A Brief History of AI',
          microLessons: [
            { id: 'ai-f1-2-1', title: 'The Dartmouth Workshop: The Birth of AI' },
            { id: 'ai-f1-2-2', title: 'The Lighthill Report and the AI Winters' },
            { id: 'ai-f1-2-3', title: 'The Rise of Expert Systems' },
            { id: 'ai-f1-2-4', title: 'The Deep Learning Revolution' },
          ]
        },
        {
          id: 'ai-f1-3', title: 'The Pillars of AI',
          microLessons: [
            { id: 'ai-f1-3-1', title: 'Learning: How AI Acquires Knowledge' },
            { id: 'ai-f1-3-2', title: 'Reasoning: How AI Makes Decisions' },
            { id: 'ai-f1-3-3', title: 'Perception: How AI Senses the World' },
            { id: 'ai-f1-3-4', title: 'Interaction: How AI Communicates' },
          ]
        }
      ]
    },
    {
      id: 'ai-f2',
      title: 'The Main Branches of AI',
      level: 'Foundations',
      description: 'A high-level tour of the major fields within Artificial Intelligence.',
      subLessons: [
        {
          id: 'ai-f2-1', title: 'Tour of the AI Landscape',
          microLessons: [
            { id: 'ai-f2-1-1', title: 'Detailed Overview: Machine Learning' },
            { id: 'ai-f2-1-2', title: 'Detailed Overview: Deep Learning' },
            { id: 'ai-f2-1-3', title: 'Detailed Overview: Natural Language Processing' },
            { id: 'ai-f2-1-4', title: 'Detailed Overview: Computer Vision' },
            { id: 'ai-f2-1-5', title: 'Detailed Overview: Reinforcement Learning' },
            { id: 'ai-f2-1-6', title: 'Detailed Overview: Generative AI & LLMs' },
            { id: 'ai-f2-1-7', title: 'Overview: Robotics & Autonomous Systems' },
            { id: 'ai-f2-1-8', title: 'Overview: Knowledge Representation & Reasoning' },
          ]
        }
      ]
    },
     {
      id: 'ai-b1',
      title: 'AI in Key Industries',
      level: 'Beginner',
      description: 'See how AI is transforming major sectors of the economy and daily life.',
      subLessons: [
        {
          id: 'ai-b1-1', title: 'Industry Spotlights',
          microLessons: [
            { id: 'ai-b1-1-1', title: 'AI in Healthcare: Diagnostics, Drug Discovery' },
            { id: 'ai-b1-1-2', title: 'AI in Finance: Fraud Detection, Algorithmic Trading' },
            { id: 'ai-b1-1-3', title: 'AI in Retail: Recommendation Engines, Supply Chain' },
            { id: 'ai-b1-1-4', title: 'AI in Entertainment: Content Generation, Personalization' },
            { id: 'ai-b1-1-5', title: 'AI in Transportation: Autonomous Vehicles, Traffic Optimization' },
          ]
        }
      ]
    },
    {
      id: 'ai-i1',
      title: 'The AI Project Lifecycle',
      level: 'Intermediate',
      description: 'Understand the end-to-end process of building and deploying an AI system.',
      subLessons: [
        {
          id: 'ai-i1-1', title: 'From Idea to Impact',
          microLessons: [
            { id: 'ai-i1-1-1', title: 'Phase 1: Problem Framing & Scoping' },
            { id: 'ai-i1-1-2', title: 'Phase 2: Data Acquisition & Preparation' },
            { id: 'ai-i1-1-3', title: 'Phase 3: Model Prototyping & Selection' },
            { id: 'ai-i1-1-4', title: 'Phase 4: Model Training & Evaluation' },
            { id: 'ai-i1-1-5', title: 'Phase 5: Deployment & Integration' },
            { id: 'ai-i1-1-6', title: 'Phase 6: Monitoring & Maintenance' },
            { id: 'ai-i1-1-7', title: 'The Importance of MLOps' },
          ]
        }
      ]
    },
    {
      id: 'ai-a1',
      title: 'Ethics and the Future of AI',
      level: 'Advanced',
      description: 'Consider the societal impact and future directions of AI technology.',
      subLessons: [
        {
          id: 'ai-a1-1', title: 'Responsible AI Development',
          microLessons: [
            { id: 'ai-a1-1-1', title: 'Key Ethical Challenge: Bias & Fairness' },
            { id: 'ai-a1-1-2', title: 'Key Ethical Challenge: Transparency & Explainability' },
            { id: 'ai-a1-1-3', title: 'Key Ethical Challenge: Privacy & Data Security' },
            { id: 'ai-a1-1-4', title: 'Key Ethical Challenge: Accountability & Governance' },
          ]
        },
        {
          id: 'ai-a1-2', title: 'Future Horizons',
          microLessons: [
            { id: 'ai-a1-2-1', title: 'The Path to AGI (Artificial General Intelligence)' },
            { id: 'ai-a1-2-2', title: 'The Role of AI Agents & Multi-Agent Systems' },
            { id: 'ai-a1-2-3', title: 'AI\'s Impact on Jobs and the Economy' },
            { id: 'ai-a1-2-4', title: 'Your Role in Shaping the Future of AI' },
          ]
        }
      ]
    }
  ]
};

export const CURRICULUM_DATA: Topic[] = [
  AI_OVERVIEW_TOPIC,
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Learn the core concepts of machine learning, from linear regression to support vector machines.',
    icon: BrainCircuitIcon,
    lessons: [
      {
        id: 'ml-f1',
        title: 'ML Foundations',
        level: 'Foundations',
        description: 'Understand the basics: what is ML and what problems can it solve?',
        subLessons: [
          { 
            id: 'ml-f1-1', title: 'Welcome to Machine Learning',
            microLessons: [
              { id: 'ml-f1-1-1', title: 'What is Machine Learning?' },
              { id: 'ml-f1-1-2', title: 'Real-World Applications of ML' },
              { id: 'ml-f1-1-3', title: 'Key Terminology: Models, Features, Labels, Instances' },
            ]
          },
          { 
            id: 'ml-f1-2', title: 'Types of ML Systems',
            microLessons: [
              { id: 'ml-f1-2-1', title: 'Supervised Learning Explained' },
              { id: 'ml-f1-2-2', title: 'Unsupervised Learning Explained' },
              { id: 'ml-f1-2-3', title: 'Semi-Supervised Learning' },
              { id: 'ml-f1-2-4', title: 'Reinforcement Learning Explained' },
              { id: 'ml-f1-2-5', title: 'Batch vs. Online Learning' },
              { id: 'ml-f1-2-6', title: 'Instance-Based vs. Model-Based Learning' },
            ]
          },
          { 
            id: 'ml-f1-3', title: 'Essential Math for ML',
            microLessons: [
              { id: 'ml-f1-3-1', title: 'Core Concepts of Linear Algebra (Vectors, Matrices)' },
              { id: 'ml-f1-3-2', title: 'Understanding Probability & Statistics' },
              { id: 'ml-f1-3-3', title: 'Introduction to Calculus (Gradients & Derivatives)' },
            ]
          },
          { 
            id: 'ml-f1-4', title: 'Python Environment and Tools',
            microLessons: [
              { id: 'ml-f1-4-1', title: 'Setting Up Your Python Environment (Jupyter, VS Code)' },
              { id: 'ml-f1-4-2', title: 'Intro to NumPy for Numerical Data' },
              { id: 'ml-f1-4-3', title: 'Intro to Pandas for Data Manipulation' },
              { id: 'ml-f1-4-4', title: 'Intro to Matplotlib & Seaborn for Visualization' },
              { id: 'ml-f1-4-5', title: 'Introduction to Scikit-Learn' },
            ]
           },
        ],
      },
      {
        id: 'ml-b1',
        title: 'Data Preparation & Feature Engineering',
        level: 'Beginner',
        description: 'The most critical step in ML: preparing your data for modeling.',
        subLessons: [
          {
            id: 'ml-b1-1', title: 'Handling Data',
            microLessons: [
              { id: 'ml-b1-1-1', title: 'Handling Missing Values' },
              { id: 'ml-b1-1-2', title: 'Handling Categorical Data: One-Hot Encoding' },
              { id: 'ml-b1-1-3', title: 'Handling Categorical Data: Label Encoding' },
              { id: 'ml-b1-1-4', title: 'Splitting Data: Training, Validation, and Test Sets' },
            ]
          },
          {
            id: 'ml-b1-2', title: 'Feature Scaling',
            microLessons: [
              { id: 'ml-b1-2-1', title: 'Why Feature Scaling is Important' },
              { id: 'ml-b1-2-2', title: 'Standardization (StandardScaler)' },
              { id: 'ml-b1-2-3', title: 'Normalization (MinMaxScaler)' },
            ]
          },
          {
            id: 'ml-b1-3', title: 'Feature Engineering',
            microLessons: [
              { id: 'ml-b1-3-1', title: 'What is Feature Engineering?' },
              { id: 'ml-b1-3-2', title: 'Creating Interaction Features' },
              { id: 'ml-b1-3-3', title: 'Polynomial Features' },
              { id: 'ml-b1-3-4', title: 'Handling Skewed Data: Log Transforms' },
            ]
          }
        ],
      },
      {
        id: 'ml-b2',
        title: 'Supervised Learning: Regression',
        level: 'Beginner',
        description: 'Predicting continuous values.',
        subLessons: [
          {
            id: 'ml-b2-1', title: 'Linear Regression',
            microLessons: [
              { id: 'ml-b2-1-1', title: 'Introduction to Regression' },
              { id: 'ml-b2-1-2', title: 'Simple & Multiple Linear Regression' },
              { id: 'ml-b2-1-3', title: 'Gradient Descent for Linear Regression' },
              { id: 'ml-b2-1-4', title: 'Regularized Linear Models: Ridge Regression' },
              { id: 'ml-b2-1-5', title: 'Regularized Linear Models: Lasso Regression' },
              { id: 'ml-b2-1-6', title: 'Regularized Linear Models: Elastic Net' },
            ]
          },
          {
            id: 'ml-b2-2', title: 'Evaluating Regression Models',
            microLessons: [
              { id: 'ml-b2-2-1', title: 'Mean Absolute Error (MAE)' },
              { id: 'ml-b2-2-2', title: 'Mean Squared Error (MSE) & RMSE' },
              { id: 'ml-b2-2-3', title: 'R-squared (Coefficient of Determination)' },
            ]
          }
        ]
      },
       {
        id: 'ml-b3',
        title: 'Supervised Learning: Classification',
        level: 'Beginner',
        description: 'Predicting categories or classes.',
        subLessons: [
          { 
            id: 'ml-b3-1', title: 'Classification Algorithms',
            microLessons: [
              { id: 'ml-b3-1-1', title: 'Introduction to Classification' },
              { id: 'ml-b3-1-2', title: 'Logistic Regression' },
              { id: 'ml-b3-1-3', title: 'K-Nearest Neighbors (KNN)' },
              { id: 'ml-b3-1-4', title: 'Naive Bayes Classifiers' },
              { id: 'ml-b3-1-5', title: 'Stochastic Gradient Descent (SGD) Classifier' },
            ]
          },
          { 
            id: 'ml-b3-2', title: 'Evaluating Classification Models',
            microLessons: [
              { id: 'ml-b3-2-1', title: 'Understanding the Confusion Matrix' },
              { id: 'ml-b3-2-2', title: 'Accuracy, Precision, and Recall' },
              { id: 'ml-b3-2-3', title: 'The F1 Score' },
              { id: 'ml-b3-2-4', title: 'The ROC Curve and AUC Score' },
            ]
          },
          {
            id: 'ml-b3-3', title: 'Handling Imbalanced Datasets',
            microLessons: [
              { id: 'ml-b3-3-1', title: 'The Problem of Imbalanced Data' },
              { id: 'ml-b3-3-2', title: 'Undersampling and Oversampling (SMOTE)' },
              { id: 'ml-b3-3-3', title: 'Using Class Weights in Models' },
            ]
          }
        ],
      },
      {
        id: 'ml-i1',
        title: 'Advanced Models & Techniques',
        level: 'Intermediate',
        description: 'More powerful and flexible models.',
        subLessons: [
          { 
            id: 'ml-i1-1', title: 'Support Vector Machines (SVMs)',
            microLessons: [
                { id: 'ml-i1-1-1', title: 'Introduction to SVMs & Maximal Margin Classifiers' },
                { id: 'ml-i1-1-2', title: 'The Kernel Trick Explained' },
                { id: 'ml-i1-1-3', title: 'Implementing SVMs for Classification and Regression' },
            ]
          },
          { 
            id: 'ml-i1-2', title: 'Decision Trees',
            microLessons: [
                { id: 'ml-i1-2-1', title: 'How Decision Trees Make Decisions' },
                { id: 'ml-i1-2-2', title: 'Understanding Gini Impurity and Entropy' },
                { id: 'ml-i1-2-3', title: 'Visualizing a Decision Tree' },
                { id: 'ml-i1-2-4', title: 'Pruning to Prevent Overfitting' },
            ]
          },
          { 
            id: 'ml-i1-3', title: 'Ensemble Learning',
            microLessons: [
                { id: 'ml-i1-3-1', title: 'The Wisdom of the Crowd: Intro to Ensembles' },
                { id: 'ml-i1-3-2', title: 'Bagging and Pasting' },
                { id: 'ml-i1-3-3', title: 'Random Forests' },
                { id: 'ml-i1-3-4', title: 'Boosting: AdaBoost' },
                { id: 'ml-i1-3-5', title: 'Boosting: Gradient Boosting (and XGBoost)' },
                { id: 'ml-i1-3-6', title: 'Stacking: Combining Models' },
            ]
          },
        ],
      },
      {
        id: 'ml-i2',
        title: 'Model Training In-Depth',
        level: 'Intermediate',
        description: 'Fine-tuning the training process.',
         subLessons: [
           {
            id: 'ml-i2-1', title: 'Core Concepts in Model Training',
            microLessons: [
                { id: 'ml-i2-1-1', title: 'Understanding the Bias-Variance Tradeoff' },
                { id: 'ml-i2-1-2', title: 'Diagnosing Overfitting and Underfitting' },
                { id: 'ml-i2-1-3', title: 'Cross-Validation Explained' },
            ]
          },
          {
            id: 'ml-i2-2', title: 'Hyperparameter Tuning',
            microLessons: [
                { id: 'ml-i2-2-1', title: 'What Are Hyperparameters?' },
                { id: 'ml-i2-2-2', title: 'Automating with Grid Search' },
                { id: 'ml-i2-2-3', title: 'Automating with Randomized Search' },
                { id: 'ml-i2-2-4', title: 'Introduction to Bayesian Optimization' },
            ]
          },
         ]
      },
      {
        id: 'ml-i3',
        title: 'Unsupervised Learning',
        level: 'Intermediate',
        description: 'Finding hidden patterns in data.',
        subLessons: [
          { 
            id: 'ml-i3-1', title: 'Clustering',
            microLessons: [
                { id: 'ml-i3-1-1', title: 'Introduction to Clustering with K-Means' },
                { id: 'ml-i3-1-2', title: 'Choosing the Optimal Number of Clusters (Elbow Method & Silhouette Score)' },
                { id: 'ml-i3-1-3', title: 'DBSCAN: Density-Based Clustering' },
                { id: 'ml-i3-1-4', title: 'Hierarchical Clustering' },
                { id: 'ml-i3-1-5', title: 'Project Idea: Customer Segmentation' },
            ]
          },
          { 
            id: 'ml-i3-2', title: 'Dimensionality Reduction',
            microLessons: [
                { id: 'ml-i3-2-1', title: 'The Curse of Dimensionality' },
                { id: 'ml-i3-2-2', title: 'Principal Component Analysis (PCA)' },
                { id: 'ml-i3-2-3', title: 't-SNE for Data Visualization' },
                { id: 'ml-i3-2-4', title: 'UMAP for Data Visualization' },
            ]
          },
        ],
      },
       {
        id: 'ml-i4',
        title: 'Building ML Pipelines',
        level: 'Intermediate',
        description: 'Automating the ML workflow from data prep to prediction.',
        subLessons: [
          { 
            id: 'ml-i4-1', title: 'Scikit-Learn Pipelines',
            microLessons: [
                { id: 'ml-i4-1-1', title: 'The Need for Pipelines' },
                { id: 'ml-i4-1-2', title: 'Constructing a Simple Pipeline' },
                { id: 'ml-i4-1-3', title: 'Using ColumnTransformer for Mixed Data Types' },
                { id: 'ml-i4-1-4', title: 'Grid Search with Pipelines' },
            ]
          },
        ],
      },
      {
        id: 'ml-a1',
        title: 'Advanced ML & MLOps',
        level: 'Advanced',
        description: 'Specialized techniques and productionalizing models.',
        subLessons: [
          { 
            id: 'ml-a1-1', title: 'Recommender Systems',
            microLessons: [
                { id: 'ml-a1-1-1', title: 'Collaborative Filtering' },
                { id: 'ml-a1-1-2', title: 'Content-Based Filtering' },
                { id: 'ml-a1-1-3', title: 'Hybrid Recommender Systems' },
            ]
          },
          { 
            id: 'ml-a1-2', title: 'Model Deployment and MLOps',
            microLessons: [
                { id: 'ml-a1-2-1', title: 'Saving and Loading Models' },
                { id: 'ml-a1-2-2', title: 'Creating a Model API with FastAPI' },
                { id: 'ml-a1-2-3', title: 'Introduction to Docker for ML' },
                { id: 'ml-a1-2-4', title: 'CI/CD for Machine Learning' },
            ]
          },
          { 
            id: 'ml-a1-3', title: 'Ethics in Machine Learning',
            microLessons: [
                { id: 'ml-a1-3-1', title: 'Understanding and Mitigating Bias' },
                { id: 'ml-a1-3-2', title: 'Model Fairness and Explainability (SHAP, LIME)' },
                { id: 'ml-a1-3-3', title: 'Privacy and Data Security' },
            ]
          },
        ],
      },
       {
        id: 'ml-a2',
        title: 'Specialized ML Applications',
        level: 'Advanced',
        description: 'Applying ML to specific, challenging problem domains.',
        subLessons: [
          { 
            id: 'ml-a2-1', title: 'Time Series Analysis',
            microLessons: [
                { id: 'ml-a2-1-1', title: 'Concepts: Stationarity, Seasonality, Trend' },
                { id: 'ml-a2-1-2', title: 'Classical Models: ARIMA' },
                { id: 'ml-a2-1-3', title: 'Feature Engineering for Time Series' },
                { id: 'ml-a2-1-4', title: 'Forecasting with ML Models' },
            ]
          },
          { 
            id: 'ml-a2-2', title: 'Anomaly Detection',
            microLessons: [
                { id: 'ml-a2-2-1', title: 'Types of Anomalies' },
                { id: 'ml-a2-2-2', title: 'Statistical Methods for Anomaly Detection' },
                { id: 'ml-a2-2-3', title: 'Isolation Forest' },
                { id: 'ml-a2-2-4', title: 'One-Class SVM' },
            ]
          },
        ],
      },
    ],
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    description: 'Dive into neural networks, the powerhouse of modern AI.',
    icon: LayersIcon,
    lessons: [
        {
            id: 'dl-f1',
            title: 'Neural Network Foundations',
            level: 'Foundations',
            description: 'The building blocks of Deep Learning.',
            subLessons: [
                { 
                    id: 'dl-f1-1', title: 'The Artificial Neuron',
                    microLessons: [
                        { id: 'dl-f1-1-1', title: 'From Linear Regression to Neurons' },
                        { id: 'dl-f1-1-2', title: 'Activation Functions: Sigmoid, Tanh, ReLU' },
                        { id: 'dl-f1-1-3', title: 'Variations of ReLU (Leaky, PReLU, ELU)' },
                        { id: 'dl-f1-1-4', title: 'The Softmax Activation for Multi-class Output' },
                    ]
                },
                { 
                    id: 'dl-f1-2', title: 'How Neural Networks Learn',
                    microLessons: [
                        { id: 'dl-f1-2-1', title: 'Gradient Descent Explained Visually' },
                        { id: 'dl-f1-2-2', title: 'The Magic of Backpropagation' },
                        { id: 'dl-f1-2-3', title: 'Understanding Loss Functions (MSE, Cross-Entropy)' },
                    ]
                },
                {
                    id: 'dl-f1-3', title: 'Training a Neural Network',
                    microLessons: [
                        { id: 'dl-f1-3-1', title: 'Optimizers: SGD with Momentum, RMSprop, Adam' },
                        { id: 'dl-f1-3-2', title: 'Understanding Learning Rate' },
                        { id: 'dl-f1-3-3', title: 'Weight Initialization Techniques' },
                        { id: 'dl-f1-3-4', title: 'The Vanishing/Exploding Gradients Problem' },
                    ]
                },
                { 
                    id: 'dl-f1-4', title: 'Intro to Deep Learning Frameworks',
                    microLessons: [
                        { id: 'dl-f1-4-1', title: 'Understanding Tensors' },
                        { id: 'dl-f1-4-2', title: 'Introduction to TensorFlow and Keras' },
                        { id: 'dl-f1-4-3', title: 'Introduction to PyTorch' },
                        { id: 'dl-f1-4-4', title: 'Building Your First Neural Network' },
                    ]
                },
            ],
        },
        {
            id: 'dl-i1',
            title: 'Convolutional Neural Networks (CNNs)',
            level: 'Intermediate',
            description: 'The core of modern computer vision.',
            subLessons: [
                { 
                    id: 'dl-i1-1', title: 'Core CNN Components',
                    microLessons: [
                        { id: 'dl-i1-1-1', title: 'The Convolution Operation' },
                        { id: 'dl-i1-1-2', title: 'Padding and Strides' },
                        { id: 'dl-i1-1-3', title: 'Pooling Layers (Max, Average)' },
                        { id: 'dl-i1-1-4', title: 'Building a CNN for Image Classification' },
                    ]
                },
                {
                    id: 'dl-i1-2', title: 'Modern CNN Architectures',
                    microLessons: [
                        { id: 'dl-i1-2-1', title: 'Classic Architectures: LeNet, AlexNet, VGG' },
                        { id: 'dl-i1-2-2', title: 'Advanced Architectures: ResNet and Residual Connections' },
                        { id: 'dl-i1-2-3', title: 'Advanced Architectures: Inception Networks (GoogLeNet)' },
                        { id: 'dl-i1-2-4', title: 'Advanced Architectures: MobileNet and EfficientNet' },
                    ]
                },
                {
                    id: 'dl-i1-3', title: 'Advanced CNN Techniques',
                    microLessons: [
                        { id: 'dl-i1-3-1', title: 'Understanding Transfer Learning' },
                        { id: 'dl-i1-3-2', title: 'Data Augmentation for Images' },
                        { id: 'dl-i1-3-3', title: 'Regularization: Dropout and Batch Normalization' },
                    ]
                }
            ],
        },
        {
            id: 'dl-i2',
            title: 'Recurrent Neural Networks (RNNs)',
            level: 'Intermediate',
            description: 'Processing sequential data like text and time series.',
            subLessons: [
                { 
                    id: 'dl-i2-1', title: 'The Challenge of Sequential Data',
                    microLessons: [
                        { id: 'dl-i2-1-1', title: 'Introduction to Sequential Data' },
                        { id: 'dl-i2-1-2', title: 'The structure of a Simple RNN' },
                        { id: 'dl-i2-1-3', title: 'The Vanishing/Exploding Gradient Problem in RNNs' },
                    ]
                },
                { 
                    id: 'dl-i2-2', title: 'Advanced Recurrent Models',
                    microLessons: [
                        { id: 'dl-i2-2-1', title: 'Long Short-Term Memory Networks (LSTMs)' },
                        { id: 'dl-i2-2-2', 'title': 'Gated Recurrent Units (GRUs)' },
                        { id: 'dl-i2-2-3', 'title': 'Bidirectional RNNs' },
                        { id: 'dl-i2-2-4', 'title': 'Stacked RNNs' },
                        { id: 'dl-i2-2-5', 'title': 'Project Idea: Time Series Forecasting' },
                    ]
                },
            ],
        },
        {
            id: 'dl-a1',
            title: 'Advanced Deep Learning Architectures',
            level: 'Advanced',
            description: 'Cutting-edge models and techniques.',
            subLessons: [
                { 
                    id: 'dl-a1-1', title: 'The Attention Mechanism & Transformers',
                    microLessons: [
                        { id: 'dl-a1-1-1', title: 'The Attention Mechanism Explained' },
                        { id: 'dl-a1-1-2', title: 'Sequence-to-Sequence (Seq2Seq) with Attention' },
                        { id: 'dl-a1-1-3', title: 'Self-Attention' },
                        { id: 'dl-a1-1-4', title: 'Anatomy of the Transformer (Encoders, Decoders, Positional Encodings)' },
                    ]
                },
                { 
                    id: 'dl-a1-2', title: 'Generative Models',
                    microLessons: [
                        { id: 'dl-a1-2-1', title: 'Generative Adversarial Networks (GANs)' },
                        { id: 'dl-a1-2-2', title: 'Autoencoders and Variational Autoencoders (VAEs)' },
                        { id: 'dl-a1-2-3', title: 'Introduction to Diffusion Models' },
                    ]
                },
                {
                    id: 'dl-a1-3', title: 'Other Architectures',
                    microLessons: [
                        { id: 'dl-a1-3-1', title: 'Graph Neural Networks (GNNs)' },
                        { id: 'dl-a1-3-2', title: 'Siamese Networks for one-shot learning' },
                    ]
                }
            ],
        },
        {
            id: 'dl-a2',
            title: 'Optimizing and Deploying DL Models',
            level: 'Advanced',
            description: 'Making models faster, smaller, and ready for production.',
            subLessons: [
                { 
                    id: 'dl-a2-1', title: 'Model Optimization',
                    microLessons: [
                        { id: 'dl-a2-1-1', title: 'Model Pruning' },
                        { id: 'dl-a2-1-2', title: 'Knowledge Distillation' },
                        { id: 'dl-a2-1-3', title: 'Quantization (FP16, INT8)' },
                    ]
                },
                { 
                    id: 'dl-a2-2', title: 'Deployment Strategies',
                    microLessons: [
                        { id: 'dl-a2-2-1', title: 'Serving with TensorFlow Serving' },
                        { id: 'dl-a2-2-2', title: 'Serving with TorchServe' },
                        { id: 'dl-a2-2-3', title: 'Introduction to ONNX for Interoperability' },
                        { id: 'dl-a2-2-4', title: 'Edge AI and TensorFlow Lite' },
                    ]
                },
            ],
        }
    ],
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Teach machines to understand and generate human language.',
    icon: BotIcon,
    lessons: [
        {
            id: 'nlp-f1',
            title: 'Foundations of NLP',
            level: 'Foundations',
            description: 'Core techniques for processing and understanding text.',
            subLessons: [
                {
                    id: 'nlp-f1-1', title: 'Text Preprocessing',
                    microLessons: [
                        { id: 'nlp-f1-1-1', title: 'Tokenization: Words, Sentences, and Subwords' },
                        { id: 'nlp-f1-1-2', title: 'Cleaning Text: Stop Words and Punctuation' },
                        { id: 'nlp-f1-1-3', title: 'Normalizing Text: Stemming and Lemmatization' },
                    ]
                },
                {
                    id: 'nlp-f1-2', title: 'Representing Text Numerically',
                    microLessons: [
                        { id: 'nlp-f1-2-1', title: 'Bag-of-Words (BoW)' },
                        { id: 'nlp-f1-2-2', title: 'Term Frequency-Inverse Document Frequency (TF-IDF)' },
                        { id: 'nlp-f1-2-3', title: 'Understanding N-grams' },
                    ]
                },
                {
                    id: 'nlp-f1-3', title: 'Classical NLP Tasks',
                    microLessons: [
                        { id: 'nlp-f1-3-1', title: 'Part-of-Speech (POS) Tagging' },
                        { id: 'nlp-f1-3-2', title: 'Named Entity Recognition (NER)' },
                        { id: 'nlp-f1-3-3', title: 'Sentiment Analysis with Classical Methods' },
                    ]
                }
            ]
        },
        {
            id: 'nlp-i1',
            title: 'Deep Learning for NLP',
            level: 'Intermediate',
            description: 'Using neural networks for language tasks.',
            subLessons: [
                {
                    id: 'nlp-i1-1', title: 'Word Embeddings',
                    microLessons: [
                        { id: 'nlp-i1-1-1', title: 'The Idea of Distributed Representations' },
                        { id: 'nlp-i1-1-2', title: 'Word2Vec: Skip-gram and CBOW' },
                        { id: 'nlp-i1-1-3', title: 'GloVe: Global Vectors for Word Representation' },
                        { id: 'nlp-i1-1-4', title: 'Visualizing Word Embeddings with t-SNE' },
                    ]
                },
                {
                    id: 'nlp-i1-2', title: 'Sequence Models for Text',
                    microLessons: [
                        { id: 'nlp-i1-2-1', title: 'Applying RNNs and LSTMs to Text Classification' },
                        { id: 'nlp-i1-2-2', title: 'Sequence-to-Sequence (Seq2Seq) Models for Translation' },
                        { id: 'nlp-i1-2-3', title: 'Seq2Seq with Attention Mechanism' },
                    ]
                }
            ]
        },
        {
            id: 'nlp-a1',
            title: 'Modern NLP with Transformers',
            level: 'Advanced',
            description: 'Leveraging Transformers and Large Language Models.',
            subLessons: [
                {
                    id: 'nlp-a1-1', title: 'The Transformer Architecture',
                    microLessons: [
                        { id: 'nlp-a1-1-1', title: 'Transformers for NLP: A Recap' },
                        { id: 'nlp-a1-1-2', title: 'BERT: Pre-training of Deep Bidirectional Transformers' },
                        { id: 'nlp-a1-1-3', title: 'The GPT Family of Models' },
                        { id: 'nlp-a1-1-4', title: 'Fine-tuning Pre-trained Models' },
                    ]
                },
                {
                    id: 'nlp-a1-2', title: 'Advanced NLP Tasks',
                    microLessons: [
                        { id: 'nlp-a1-2-1', title: 'Machine Translation with Transformers' },
                        { id: 'nlp-a1-2-2', title: 'Text Summarization (Extractive vs. Abstractive)' },
                        { id: 'nlp-a1-2-3', title: 'Question Answering Systems' },
                        { id: 'nlp-a1-2-4', title: 'Natural Language Generation (NLG)' },
                    ]
                },
                {
                    id: 'nlp-a1-3', title: 'Evaluating Language Models',
                    microLessons: [
                        { id: 'nlp-a1-3-1', title: 'Intrinsic vs. Extrinsic Evaluation' },
                        { id: 'nlp-a1-3-2', title: 'Perplexity, BLEU, ROUGE scores' },
                        { id: 'nlp-a1-3-3', title: 'The GLUE and SuperGLUE benchmarks' },
                    ]
                }
            ]
        },
         {
            id: 'nlp-a2',
            title: 'Building with LLMs: The Ecosystem',
            level: 'Advanced',
            description: 'Tools and techniques for creating applications on top of LLMs.',
            subLessons: [
                {
                    id: 'nlp-a2-1', title: 'Building Chatbots & Conversational AI',
                    microLessons: [
                        { id: 'nlp-a2-1-1', title: 'Designing Conversation Flows' },
                        { id: 'nlp-a2-1-2', title: 'Managing Chat History and Context' },
                        { id: 'nlp-a2-1-3', title: 'Integrating with External APIs' },
                    ]
                },
                {
                    id: 'nlp-a2-2', title: 'Ethics in NLP',
                    microLessons: [
                        { id: 'nlp-a2-2-1', title: 'Bias in Language Models' },
                        { id: 'nlp-a2-2-2', title: 'Misinformation and Content Moderation' },
                        { id: 'nlp-a2-2-3', title: 'Dual-Use Nature of Language Technologies' },
                    ]
                },
            ]
        },
    ]
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    description: 'Enable computers to "see" and interpret the visual world.',
    icon: EyeIcon,
    lessons: [
        {
            id: 'cv-f1',
            title: 'Foundations of Computer Vision',
            level: 'Foundations',
            description: 'The basics of images and how to manipulate them.',
            subLessons: [
                {
                    id: 'cv-f1-1', title: 'Image Fundamentals',
                    microLessons: [
                        { id: 'cv-f1-1-1', title: 'How Computers See Images: Pixels and Coordinates' },
                        { id: 'cv-f1-1-2', title: 'Color Spaces: RGB, Grayscale, HSV' },
                        { id: 'cv-f1-1-3', title: 'Introduction to OpenCV and Pillow' },
                    ]
                },
                {
                    id: 'cv-f1-2', title: 'Basic Image Processing',
                    microLessons: [
                        { id: 'cv-f1-2-1', title: 'Image Transformations: Resizing, Cropping, Rotating' },
                        { id: 'cv-f1-2-2', title: 'Image Filtering: Blurring and Sharpening' },
                        { id: 'cv-f1-2-3', title: 'Edge Detection with Canny and Sobel' },
                        { id: 'cv-f1-2-4', title: 'Thresholding and Binarization' },
                        { id: 'cv-f1-2-5', title: 'Morphological Transformations' },
                    ]
                }
            ]
        },
        {
            id: 'cv-i1',
            title: 'Image Classification with Deep Learning',
            level: 'Intermediate',
            description: 'Using CNNs to classify and recognize images.',
            subLessons: [
                {
                    id: 'cv-i1-1', title: 'CNNs for Vision',
                    microLessons: [
                        { id: 'cv-i1-1-1', title: 'Applying CNNs to Image Data: A Recap' },
                        { id: 'cv-i1-1-2', title: 'Transfer Learning with Pre-trained Models (VGG16, ResNet)' },
                        { id: 'cv-i1-1-3', title: 'Fine-tuning vs. Feature Extraction' },
                        { id: 'cv-i1-1-4', title: 'Project Idea: Cat vs. Dog Classifier' },
                    ]
                },
                {
                    id: 'cv-i1-2', title: 'Improving Classification Models',
                    microLessons: [
                        { id: 'cv-i1-2-1', title: 'Data Augmentation for Images' },
                        { id: 'cv-i1-2-2', title: 'Understanding and Using Dropout' },
                        { id: 'cv-i1-2-3', title: 'Batch Normalization' },
                        { id: 'cv-i1-2-4', title: 'Visualizing What a CNN Learns (Activation Maps)' },
                    ]
                }
            ]
        },
        {
            id: 'cv-a1',
            title: 'Object Detection and Segmentation',
            level: 'Advanced',
            description: 'Going beyond classification to locate and outline objects.',
            subLessons: [
                {
                    id: 'cv-a1-1', title: 'Object Detection',
                    microLessons: [
                        { id: 'cv-a1-1-1', title: 'The Object Detection Task and Bounding Boxes' },
                        { id: 'cv-a1-1-2', title: 'R-CNN Family (R-CNN, Fast R-CNN, Faster R-CNN)' },
                        { id: 'cv-a1-1-3', title: 'Single-Shot Detectors: YOLO and SSD' },
                        { id: 'cv-a1-1-4', title: 'Evaluating Object Detectors: IoU and mAP' },
                    ]
                },
                {
                    id: 'cv-a1-2', title: 'Image Segmentation',
                    microLessons: [
                        { id: 'cv-a1-2-1', title: 'Semantic Segmentation (FCN, U-Net)' },
                        { id: 'cv-a1-2-2', title: 'Instance Segmentation (Mask R-CNN)' },
                        { id: 'cv-a1-2-3', title: 'Panoptic Segmentation' },
                    ]
                },
            ]
        },
        {
            id: 'cv-a2',
            title: 'Advanced Vision Applications',
            level: 'Advanced',
            description: 'Exploring specialized and modern CV tasks.',
            subLessons: [
                 {
                    id: 'cv-a2-1', title: 'Other Advanced Vision Tasks',
                    microLessons: [
                        { id: 'cv-a2-1-1', title: 'Facial Recognition' },
                        { id: 'cv-a2-1-2', title: 'Generative Models for Images (GANs, Diffusion)' },
                        { id: 'cv-a2-1-3', title: 'Image Captioning' },
                        { id: 'cv-a2-1-4', title: 'Optical Character Recognition (OCR)' },
                    ]
                },
                {
                    id: 'cv-a2-2', title: 'Video Analysis',
                    microLessons: [
                        { id: 'cv-a2-2-1', title: 'Action Recognition in Videos' },
                        { id: 'cv-a2-2-2', title: 'Object Tracking in Video Streams' },
                        { id: 'cv-a2-2-3', title: 'Working with Video Data' },
                    ]
                },
            ]
        }
    ]
  },
   {
    id: 'rl',
    title: 'Reinforcement Learning',
    description: 'Train agents to make optimal decisions through trial and error.',
    icon: GameControllerIcon,
    lessons: [
        {
            id: 'rl-f1',
            title: 'Foundations of RL',
            level: 'Foundations',
            description: 'The core framework for decision-making agents.',
            subLessons: [
                {
                    id: 'rl-f1-1', title: 'The Reinforcement Learning Problem',
                    microLessons: [
                        { id: 'rl-f1-1-1', title: 'Agents, Environments, States, Actions, Rewards' },
                        { id: 'rl-f1-1-2', title: 'Episodic vs. Continuing Tasks' },
                        { id: 'rl-f1-1-3', title: 'The Exploration-Exploitation Dilemma' },
                        { id: 'rl-f1-1-4', title: 'Introduction to Multi-Armed Bandits' },
                    ]
                },
                {
                    id: 'rl-f1-2', title: 'Markov Decision Processes (MDPs)',
                    microLessons: [
                        { id: 'rl-f1-2-1', title: 'Understanding the Markov Property' },
                        { id: 'rl-f1-2-2', title: 'Policies (Stochastic vs. Deterministic)' },
                        { id: 'rl-f1-2-3', title: 'Value Functions (State-value and Action-value)' },
                        { id: 'rl-f1-2-4', title: 'The Bellman Equation' },
                    ]
                },
            ]
        },
        {
            id: 'rl-i1',
            title: 'Value-Based Methods',
            level: 'Intermediate',
            description: 'Learning the value of being in a state or taking an action.',
            subLessons: [
                {
                    id: 'rl-i1-1', title: 'Model-Free Prediction and Control',
                    microLessons: [
                        { id: 'rl-i1-1-1', title: 'Monte Carlo Methods' },
                        { id: 'rl-i1-1-2', title: 'Temporal-Difference (TD) Learning' },
                        { id: 'rl-i1-1-3', title: 'SARSA: On-Policy TD Control' },
                        { id: 'rl-i1-1-4', title: 'Q-Learning: Off-Policy TD Control' },
                    ]
                },
                {
                    id: 'rl-i1-2', title: 'Deep Q-Networks (DQN)',
                    microLessons: [
                        { id: 'rl-i1-2-1', title: 'Function Approximation for RL' },
                        { id: 'rl-i1-2-2', title: 'Deep Q-Networks (DQN)' },
                        { id: 'rl-i1-2-3', title: 'Experience Replay and Target Networks' },
                        { id: 'rl-i1-2-4', title: 'DQN Improvements: Double DQN, Dueling DQN' },
                    ]
                }
            ]
        },
        {
            id: 'rl-a1',
            title: 'Policy-Based Methods',
            level: 'Advanced',
            description: 'Directly learning the optimal policy.',
            subLessons: [
                {
                    id: 'rl-a1-1', title: 'Policy Gradients',
                    microLessons: [
                        { id: 'rl-a1-1-1', title: 'The Intuition Behind Policy Gradients' },
                        { id: 'rl-a1-1-2', title: 'The REINFORCE Algorithm' },
                        { id: 'rl-a1-1-3', title: 'Policy Gradients with a Baseline' },
                    ]
                },
                {
                    id: 'rl-a1-2', title: 'Actor-Critic Methods',
                    microLessons: [
                        { id: 'rl-a1-2-1', title: 'Combining Value and Policy-Based Methods' },
                        { id: 'rl-a1-2-2', title: 'Advantage Actor-Critic (A2C/A3C)' },
                        { id: 'rl-a1-2-3', title: 'Modern Algorithms: Proximal Policy Optimization (PPO)' },
                        { id: 'rl-a1-2-4', title: 'Modern Algorithms: Soft Actor-Critic (SAC)' },
                    ]
                },
            ]
        },
         {
            id: 'rl-a2',
            title: 'The Frontier of RL',
            level: 'Advanced',
            description: 'Exploring modern applications and challenges.',
            subLessons: [
                 {
                    id: 'rl-a2-1', title: 'Advanced Topics in RL',
                    microLessons: [
                        { id: 'rl-a2-1-1', title: 'Model-Based RL' },
                        { id: 'rl-a2-1-2', title: 'Multi-Agent RL (MARL)' },
                        { id: 'rl-a2-1-3', title: 'Inverse Reinforcement Learning' },
                    ]
                },
                {
                    id: 'rl-a2-2', title: 'Real-World RL',
                    microLessons: [
                        { id: 'rl-a2-2-1', title: 'RL from Human Feedback (RLHF)' },
                        { id: 'rl-a2-2-2', title: 'Challenges: Sample Efficiency & Safety' },
                        { id: 'rl-a2-2-3', title: 'Applications in Robotics and Game Playing' },
                    ]
                }
            ]
        }
    ]
  },
  {
    id: 'genai',
    title: 'Generative AI & LLMs',
    description: 'Explore the cutting edge of AI, creating novel content from text to images.',
    icon: RocketIcon,
    lessons: [
        {
            id: 'genai-f1',
            title: 'Foundations of Generative AI',
            level: 'Foundations',
            description: 'Understanding the models that create.',
            subLessons: [
                { 
                    id: 'genai-f1-1', title: 'Introduction to Generative AI',
                    microLessons: [
                       { id: 'genai-f1-1-1', title: 'What is Generative AI?' },
                       { id: 'genai-f1-1-2', title: 'Generative vs. Discriminative Models' },
                       { id: 'genai-f1-1-3', title: 'Overview of Generative Model Types (GANs, VAEs, Diffusion)' },
                    ]
                },
                { 
                    id: 'genai-f1-2', title: 'Introduction to LLMs',
                    microLessons: [
                        { id: 'genai-f1-2-1', title: 'The Transformer Architecture Revisited' },
                        { id: 'genai-f1-2-2', title: 'What makes a Language Model "Large"?' },
                        { id: 'genai-f1-2-3', title: 'Key LLM Terminology (Tokens, Parameters, Context Window)' },
                        { id: 'genai-f1-2-4', title: 'Scaling Laws for Neural Language Models' },
                    ]
                },
            ],
        },
        {
            id: 'genai-b1',
            title: 'Working with LLMs',
            level: 'Beginner',
            description: 'Practical applications and techniques.',
            subLessons: [
                { 
                    id: 'genai-b1-1', title: 'Prompt Engineering',
                    microLessons: [
                        { id: 'genai-b1-1-1', title: 'The Art of Prompting: Instructions, Examples, and Roles' },
                        { id: 'genai-b1-1-2', title: 'Zero-Shot, One-Shot, and Few-Shot Prompting' },
                        { id: 'genai-b1-1-3', title: 'Advanced Prompting: Chain-of-Thought' },
                        { id: 'genai-b1-1-4', title: 'Controlling Output with Temperature and Top-P' },
                    ]
                },
                { 
                    id: 'genai-b1-2', title: 'Building with the Gemini API',
                    microLessons: [
                        { id: 'genai-b1-2-1', title: 'Using the Gemini API for Text Generation' },
                        { id: 'genai-b1-2-2', title: 'Building a Simple Q&A Bot' },
                        { id: 'genai-b1-2-3', title: 'Handling Streaming Responses' },
                        { id: 'genai-b1-2-4', title: 'Function Calling with Gemini' },
                    ]
                },
            ],
        },
        {
            id: 'genai-i1',
            title: 'Advanced Generative Techniques',
            level: 'Intermediate',
            description: 'Going beyond simple text generation.',
            subLessons: [
                { 
                    id: 'genai-i1-1', title: 'Improving LLM Performance',
                    microLessons: [
                        { id: 'genai-i1-1-1', title: 'Retrieval-Augmented Generation (RAG)' },
                        { id: 'genai-i1-1-2', title: 'Understanding Vector Databases' },
                        { id: 'genai-i1-1-3', title: 'Introduction to Fine-tuning' },
                        { id: 'genai-i1-1-4', title: 'Parameter-Efficient Fine-Tuning (PEFT) and LoRA' },
                    ]
                },
            ],
        },
        {
            id: 'genai-i2',
            title: 'Building Multimodal Applications',
            level: 'Intermediate',
            description: 'Combining different data types like text, images, and audio.',
             subLessons: [
                { 
                    id: 'genai-i2-1', title: 'Multimodal AI Concepts',
                    microLessons: [
                        { id: 'genai-i2-1-1', title: 'Understanding Multi-modal Inputs (Image + Text)' },
                        { id: 'genai-i2-1-2', title: 'Introduction to Generative Image Models (Diffusion)' },
                        { id: 'genai-i2-1-3', title: 'Generating Code with LLMs' },
                        { id: 'genai-i2-1-4', title: 'Text-to-Speech and Speech-to-Text' },
                    ]
                },
            ]
        },
        {
            id: 'genai-a1',
            title: 'The Frontier of Generative AI',
            level: 'Advanced',
            description: 'Exploring the future of AI capabilities.',
            subLessons: [
                { 
                    id: 'genai-a1-1', title: 'AI Agents and Autonomous Systems',
                    microLessons: [
                        { id: 'genai-a1-1-1', title: 'What is an AI Agent?' },
                        { id: 'genai-a1-1-2', title: 'The ReAct (Reason + Act) Framework' },
                        { id: 'genai-a1-1-3', title: 'LangChain and other Agentic Frameworks' },
                        { id: 'genai-a1-1-4', title: 'Challenges in Building Autonomous Agents' },
                    ]
                },
                { 
                    id: 'genai-a1-2', title: 'Evaluating and Safeguarding LLMs',
                    microLessons: [
                        { id: 'genai-a1-2-1', title: 'The Problem of Hallucinations' },
                        { id: 'genai-a1-2-2', title: 'Measuring and Mitigating Bias in LLMs' },
                        { id: 'genai-a1-2-3', title: 'Red Teaming and Safety Filters' },
                        { id: 'genai-a1-2-4', title: 'Constitutional AI' },
                    ]
                },
                 { 
                    id: 'genai-a1-3', title: 'The GenAI Ecosystem',
                    microLessons: [
                        { id: 'genai-a1-3-1', title: 'Open Source vs. Closed Source Models' },
                        { id: 'genai-a1-3-2', title: 'The Economics and Societal Impact of GenAI' },
                        { id: 'genai-a1-3-3', title: 'The Future of Human-AI Collaboration' },
                    ]
                },
            ],
        },
        {
            id: 'genai-a2',
            title: 'LLM Operations (LLMOps)',
            level: 'Advanced',
            description: 'The process of deploying, managing, and monitoring LLMs in production.',
            subLessons: [
                {
                    id: 'genai-a2-1', title: 'Core LLMOps',
                    microLessons: [
                        { id: 'genai-a2-1-1', title: 'Prompt Management and Versioning' },
                        { id: 'genai-a2-1-2', title: 'Monitoring for Cost, Latency, and Quality' },
                        { id: 'genai-a2-1-3', title: 'Caching and Optimization Strategies' },
                        { id: 'genai-a2-1-4', title: 'A/B Testing Prompts and Models' },
                    ]
                }
            ]
        }
    ],
  },
];