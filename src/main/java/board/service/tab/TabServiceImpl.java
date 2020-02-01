package board.service.tab;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board.dto.tab.TabDto;
import board.mapper.tab.TabMapper;

@Service
public class TabServiceImpl implements TabService {
	
	@Autowired
	private TabMapper tabMapper;

	@Override
	public void insertTab(TabDto tab) throws Exception {
		tabMapper.insertTab(tab);
	}

	@Override
	public List<TabDto> selectTabList() throws Exception {
		return tabMapper.selectTabList();
	}

}
