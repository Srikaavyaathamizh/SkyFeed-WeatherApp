import java.util.Scanner;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.json.JSONObject;

class Weather {
    private static final String API_KEY = "01975e30126e0d1620a74a881bb6886b";

    public static String getWeatherData(String cityName) {
        StringBuilder weatherData = new StringBuilder(); // ✅ Move inside method (avoid old data mixing)
        try {
            // Create API URL
            String urlString = "http://api.openweathermap.org/data/2.5/weather?q="
                                + cityName + "&appid=" + API_KEY;

            // Open connection
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // Read API response
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                weatherData.append(line);
            }
            reader.close();

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }
        return weatherData.toString();
    }

    public static void parseAndDisplayWeatherData(String weatherData) {
        try {
            JSONObject json = new JSONObject(weatherData);
            String cityName = json.getString("name");
            double temp = json.getJSONObject("main").getDouble("temp") - 273.15; // Kelvin → Celsius
            int humidity = json.getJSONObject("main").getInt("humidity");
            String description = json.getJSONArray("weather").getJSONObject(0).getString("description");

            System.out.println("\nWeather in " + cityName + ":");
            System.out.printf("Temperature: %.2f°C\n", temp);
            System.out.println("Humidity: " + humidity + "%");
            System.out.println("Description: " + description);
        } catch (Exception e) {
            System.out.println("Error parsing data: " + e.getMessage());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.print("Enter the City Name: ");
        String cityName = scan.nextLine();

        String weatherData = Weather.getWeatherData(cityName);

        if (weatherData != null) {
            Weather.parseAndDisplayWeatherData(weatherData);
        } else {
            System.out.println("Failed to fetch weather data.");
        }

        scan.close();
    }
}
