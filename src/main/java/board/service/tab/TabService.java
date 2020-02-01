package board.service.tab;

import java.util.List;

import board.dto.tab.TabDto;

public interface TabService {
	void insertTab(TabDto tab) throws Exception;
	List<TabDto> selectTabList() throws Exception;
}
