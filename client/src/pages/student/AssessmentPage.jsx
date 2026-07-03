import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Spin, message, Modal, Result } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { assessmentService } from '../../api/services';
import { MODULE_INFO } from '../../simulation/scenarios/scenarioData';
import CommandCenter from '../../simulation/game/CommandCenter';

const { Title, Text } = Typography;

export default function AssessmentPage() {
  const [sessionId, setSessionId] = useState(null);
  const [currentModule, setCurrentModule] = useState(0); // 0 = loading
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startOrResume();
  }, []);

  useEffect(() => {
    if (completed) {
      navigate('/results');
    }
  }, [completed, navigate]);

  const startOrResume = async () => {
    try {
      const res = await assessmentService.start();
      const { session, currentModule: mod } = res.data.data;
      setSessionId(session._id);
      setCurrentModule(mod || 1);
    } catch (error) {
      message.error('Failed to start assessment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogEvent = useCallback(async (eventData) => {
    try {
      await assessmentService.logEvent(eventData);
    } catch (error) {
      console.error('Failed to log event:', error);
    }
  }, []);

  const handleModuleComplete = useCallback(async (moduleNum) => {
    if (moduleNum < 4) {
      // Transition to next module with a brief pause
      message.success(`Module ${moduleNum} completed! Moving to Module ${moduleNum + 1}...`);
      setTimeout(() => {
        setCurrentModule(moduleNum + 1);
      }, 2000);
    } else {
      // All modules complete — calculate score
      setCompleting(true);
      try {
        await assessmentService.complete({ sessionId });
        setCompleted(true);
        message.success('Assessment completed! 🎉');
      } catch (error) {
        message.error('Failed to complete assessment');
        console.error(error);
      } finally {
        setCompleting(false);
      }
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">Preparing assessment...</Text>
        </div>
      </div>
    );
  }

  if (completing) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">Calculating your emotional regulation score...</Text>
        </div>
      </div>
    );
  }

  const moduleInfo = MODULE_INFO[currentModule];

  return (
    <div className="simulation-container">
      {/* Module Progress */}
      <div className="module-progress">
        {[1, 2, 3, 4].map((m, i) => (
          <div key={m} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 'unset', gap: 8 }}>
            <div className={`module-step ${m === currentModule ? 'active' : m < currentModule ? 'completed' : 'pending'}`}>
              {m < currentModule ? <CheckCircleOutlined /> : m}
            </div>
            {i < 3 && <div className={`module-connector ${m < currentModule ? 'completed' : ''}`} />}
          </div>
        ))}
      </div>

      {/* Module Header */}
      <Card style={{
        marginBottom: 20,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${moduleInfo.color}15 0%, ${moduleInfo.color}08 100%)`,
        borderLeft: `4px solid ${moduleInfo.color}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 32 }}>{moduleInfo.icon}</span>
          <div>
            <Title level={4} style={{ margin: 0, color: moduleInfo.color }}>
              Module {currentModule}: {moduleInfo.title}
            </Title>
            <Text type="secondary">{moduleInfo.description}</Text>
          </div>
        </div>
      </Card>

      {/* Module Content */}
      {currentModule > 0 && currentModule <= 4 && (
        <CommandCenter
          sessionId={sessionId}
          currentLevel={currentModule}
          onLogEvent={handleLogEvent}
          onLevelComplete={handleModuleComplete}
        />
      )}
    </div>
  );
}
