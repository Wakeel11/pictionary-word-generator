import { Helmet } from 'react-helmet-async';

export default function SchemaMarkup() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pictionary Word Generator 2026",
    "operatingSystem": "Web",
    "applicationCategory": "GameApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "A free, interactive Pictionary word generator with difficulty levels, categories, and built-in game tools like a timer and score counter.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1250"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use the Pictionary Word Generator",
    "step": [
      {
        "@type": "HowToStep",
        "text": "Select your desired difficulty level (Easy, Medium, Hard, or Very Hard)."
      },
      {
        "@type": "HowToStep",
        "text": "Choose a category like Animals, Movies, or Objects."
      },
      {
        "@type": "HowToStep",
        "text": "Click the 'Generate Next Word' button to get a random drawing idea."
      },
      {
        "@type": "HowToStep",
        "text": "Use the built-in timer and score counter to manage your game."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can you make sounds while playing Pictionary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you aren't allowed to say words or make any sounds. The goal is to have your teammates guess the word solely through your drawing."
        }
      },
      {
        "@type": "Question",
        "name": "How many people can play Pictionary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The ideal number is four (two teams of two), but there's no real limit. You can have larger teams or even three teams if you have a big group."
        }
      },
      {
        "@type": "Question",
        "name": "How much time do you get in Pictionary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard rule is 5 seconds to think and 60 seconds (1 minute) to draw. Our built-in timer allows you to customize this to 30s or 90s as well."
        }
      },
      {
        "@type": "Question",
        "name": "Can you play Pictionary without the game?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All you need is a drawing surface (paper, whiteboard, or tablet) and our Pictionary Word Generator to provide the prompts."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
