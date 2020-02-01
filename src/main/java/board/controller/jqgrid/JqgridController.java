package board.controller.jqgrid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class JqgridController {

	@RequestMapping("/jqgrid/openJqgrid.do")
	public String openJqgrid() throws Exception{
		return "/jqgrid/jqgridTest";
	}
	
	@RequestMapping("/jqgrid/openJqgrid2.do")
	public String openJqgrid2() throws Exception{
		return "/jqgrid/jqgridTest2";
	}

}
