package board.controller.canvas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CanvasController {

	@RequestMapping("/canvas/canvas.do")
	public String openCanvas() throws Exception{
		return "/canvas/canvas";
	}
}
