package board.controller.leaflet;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LeafletController {
	
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/leaflet/openLeaflet.do")
	public String openLeaflet() throws Exception{
		return "/leaflet/leafletFct";
	}

//	POP	강수확률	%
//	PTY	강수형태	코드값
//	R06	6시간 강수량	범주 (1 mm)
//	REH	습도	%
//	S06	6시간 신적설	범주(1 cm)
//	SKY	하늘상태	코드값
//	T3H	3시간 기온	℃
//	TMN	아침 최저기온	℃
//	TMX	낮 최고기온	℃
//	UUU	풍속(동서성분)	m/s
//	VVV	풍속(남북성분)	m/s
//	WAV	파고	M
//	VEC	풍향	m/s
//	WSD	풍속	1

	
	@RequestMapping(value="/leaflet/getWeatherData.do", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody String getWeatherData(HttpServletRequest req) throws Exception{
		String urlStr = "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=fdAVKmTWvb4BL9fpuPUn%2BcKBo%2BgFfqhai4FaWaaLhqRnxAOr23KFMsnMfGAFpilBD0uLeEGL8As96NS0uNQd7g%3D%3D";
		urlStr += "&base_date=";
		urlStr +=  req.getParameter("baseDate");
		urlStr += "&base_time=" + req.getParameter("baseTime");
		urlStr += "&nx=" + req.getParameter("x");
		urlStr += "&ny=" + req.getParameter("y");
		urlStr += "&_type=json";
		log.debug(urlStr);
		BufferedReader br = null;
		
		URL url = new URL(urlStr);
		HttpURLConnection urlCon = (HttpURLConnection)url.openConnection();
		urlCon.setRequestMethod("GET");
		br = new BufferedReader(new InputStreamReader(urlCon.getInputStream()));
		String result="";
		String line = "";
		while((line=br.readLine()) != null) {
			result += line;
		}
		log.debug(result);
		
		return result;
	}
	
	
	
	  @RequestMapping("/leaflet/map.do") public String map() throws Exception{
		  return "/leaflet/map"; 
	  }
	 
	
}
