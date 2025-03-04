    // Check cache first
    const cacheKey = `station_${stationCode}`;
    if (stationCache.has(cacheKey)) {
      return res.json(stationCache.get(cacheKey));
    }
    
    // Use OpenAI to get station information
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: `You are a UK railway station database. For each 3-letter station code, 
                    provide the full station name and basic information.`
        },
        {
          role: "user", 
          content: `Provide information for station code: ${stationCode}
                    
                    Respond ONLY with a JSON object with these fields:
                    - fullName: the complete station name
                    - location: city/area where the station is located
                    - region: region or county in the UK
                    - mainOperators: list of main train companies serving this station
                    - category: station category/size (major, medium, small)
                    
                    If the station code is not valid, or you're unsure, return a JSON with 
                    isValid: false.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 150
    });
    
    // Parse the response
    let stationInfo;
    try {
      stationInfo = JSON.parse(completion.choices[0].message.content);
    } catch (e) {
      console.error('Failed to parse OpenAI response:', e);
      stationInfo = { isValid: false, error: 'Failed to parse station information' };
    }
    
    // Cache the result
    stationCache.set(cacheKey, stationInfo);
    
    res.json(stationInfo);
  } catch (err) {
    console.error('Error fetching station information:', err);
    res.status(500).json({ error: 'Failed to retrieve station information' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
