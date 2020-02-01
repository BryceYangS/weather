package board.controller.tab;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import board.dto.tab.TabDto;
import board.service.tab.TabService;

@Controller
public class TabController {
	
	@Autowired
	private TabService tabService;
	
	@RequestMapping("/tab/insertTab.do")
	public String insertTab(@RequestParam("tabUri") String tabUri, TabDto tab) throws Exception{
		tabService.insertTab(tab);
		return "redirect:" + tabUri;
	}
	
	@RequestMapping("/tab/openTab.do")
	public ModelAndView openTabList() throws Exception{
		ModelAndView mv = new ModelAndView("index");
		List<TabDto> list = tabService.selectTabList();
		
		mv.addObject("list", list);
		return mv;
	}
	
}
