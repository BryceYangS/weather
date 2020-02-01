package board.mapper.tab;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import board.dto.tab.TabDto;

@Mapper
public interface TabMapper {
	void insertTab(TabDto tab) throws Exception;
	List<TabDto> selectTabList() throws Exception;
}
