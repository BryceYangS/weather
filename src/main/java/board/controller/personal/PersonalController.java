package board.controller.personal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import board.dto.personal.IntDstDto;
import board.service.personal.PersonalService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class PersonalController {

	@Autowired
	private PersonalService personalService;
	
	@RequestMapping("/personal/personal.do")
	public String openPersonalMain() throws Exception{
		return "/personal/personal";
	}
	
	@RequestMapping("/personal/selectIntDstList.do")
	public @ResponseBody Object selectIntDstList() throws Exception {
		List<IntDstDto> intDstList = personalService.selectIntDstList();
		return intDstList;
	}
	
	@RequestMapping("/personal/selectIntDstDetail.do")
	public @ResponseBody Object selectIntDstDetail(@RequestParam String intDstId) throws Exception{
		log.debug("제대로 넘어왔니?? IndDstId : " + intDstId);
		
		IntDstDto intDstDetail = personalService.selectIntDstDetail(intDstId);
		
		return intDstDetail;
	}
	
}
