/**
 * API services for Daily Deen
 * Integrating with Quran Foundation APIs
 */

const getEnvConfig = () => {
  const isProd = import.meta.env.VITE_ENV === 'production';
  return {
    clientId: isProd ? import.meta.env.VITE_QURAN_PROD_CLIENT_ID : import.meta.env.VITE_QURAN_TEST_CLIENT_ID,
    clientSecret: isProd ? import.meta.env.VITE_QURAN_PROD_CLIENT_SECRET : import.meta.env.VITE_QURAN_TEST_CLIENT_SECRET,
    oauthUrl: isProd ? import.meta.env.VITE_QURAN_PROD_OAUTH_URL : import.meta.env.VITE_QURAN_TEST_OAUTH_URL,
  };
};

let cachedToken = null;
let tokenExpiry = null;

// Helper to authenticate with Quran Foundation OAuth2
export const getAccessToken = async () => {
  if (cachedToken && tokenExpiry && new Date() < tokenExpiry) {
    return cachedToken;
  }

  const { clientId, clientSecret, oauthUrl } = getEnvConfig();

  if (!clientId || !clientSecret) {
    console.warn("API Keys missing in environment. Using fallback data.");
    return null;
  }

  try {
    const response = await fetch(`${oauthUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      })
    });

    if (!response.ok) {
      throw new Error(`Auth failed: ${response.status}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    
    // Set expiry based on expires_in (default to 1 hour if not provided)
    const expiresIn = data.expires_in || 3600;
    tokenExpiry = new Date(new Date().getTime() + expiresIn * 1000);
    
    return cachedToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// --- Content API (Quran Foundation) ---
export const fetchDailyWisdom = async () => {
  const token = await getAccessToken();
  
  if (token) {
    console.log("Successfully authenticated with Quran Foundation API using token.");
    // Example of how the real API call would look once the Content endpoint is mapped
    // try {
    //   const response = await fetch('https://api.quran.foundation/v1/verses/random', {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   const data = await response.json();
    //   return { quote: data.text, source: `Surah ${data.surah}, ${data.ayah}` };
    // } catch (e) { console.error(e); }
  }

  // Fallback to beautiful static content for the UI until exact endpoints are verified
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        quote: "And He found you lost and guided [you].",
        source: "Surah Ad-Duha, 93:7",
        translation: "Sahih International"
      });
    }, 500);
  });
};

// --- User API (Streak & Activity) ---
export const fetchUserStreak = async (userId) => {
  const token = await getAccessToken();
  // Simulated until endpoints mapped
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeStreak: 12,
        daysToMilestone: 5,
        milestone: "17 Days of Consistency"
      });
    }, 500);
  });
};

// --- User API (Post Reflection) ---
export const postReflection = async (userId, reflectionText) => {
  const token = await getAccessToken();
  // Simulated until endpoints mapped
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        id: `D-${Math.floor(Math.random() * 10000)}-X`,
        date: new Date().toISOString(),
        text: reflectionText
      });
    }, 800);
  });
};

// --- Content API (Scholar AI / Tafsir Mock) ---
export const fetchAIResponse = async (query) => {
  const token = await getAccessToken();
  // Simulated until Quran MCP is connected
  return new Promise((resolve) => {
    setTimeout(() => {
      let responseText = "Indeed, seeking knowledge is a sacred path. Based on classical texts, this matter requires careful consideration of context and intent.";
      let verses = [];
      
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes('zakat') || lowerQuery.includes('stock')) {
        responseText = "According to contemporary scholars, Zakat on stocks depends on your intention. If held for dividends, Zakat is due on the dividend income and liquid assets of the company. If held for capital gains (trading), Zakat is due on the current market value of the shares at 2.5%.";
        verses = ["Surah At-Tawbah 9:103"];
      } else if (lowerQuery.includes('screening') || lowerQuery.includes('equity')) {
        responseText = "Shariah-compliant equity screening involves two main criteria: 1) The core business must be permissible (Halal), excluding industries like gambling, alcohol, or conventional finance. 2) Financial ratios must be met, typically ensuring interest-bearing debt is less than 33% of total assets.";
        verses = ["Surah Al-Baqarah 2:275"];
      } else if (lowerQuery.includes('family') || lowerQuery.includes('marriage')) {
        responseText = "The foundation of family in Islam is built upon 'Mawaddah' (affection) and 'Rahmah' (mercy). It is a mutual covenant of protection and spiritual growth.";
        verses = ["Surah Ar-Rum 30:21"];
      } else if (lowerQuery.includes('ethics') || lowerQuery.includes('character')) {
        responseText = "The Prophet (ﷺ) said, 'I was sent to perfect good character.' Ethics in Islam encompass everything from honesty in business to kindness to one's neighbors.";
        verses = ["Surah Al-Qalam 68:4"];
      } else {
        responseText = `Regarding "${query}", scholars emphasize returning to the foundational principles of the Sunnah. Let us explore the specific rulings further if you require detailed jurisprudence.`;
        verses = ["Surah Al-Mujadila 58:11"];
      }

      resolve({
        response: responseText,
        relatedVerses: verses
      });
    }, 1500);
  });
};
